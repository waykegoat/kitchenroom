<script setup lang="ts">
import { computed, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoomStore } from '@/stores/room-store'
import { useFurnitureStore } from '@/stores/furniture-store'
import { useEditorStore } from '@/stores/editor-store'
import { useSvgPoint } from '@/composables/use-svg-point'
import { clampToRoom, snapPosition } from '@/utils/plan-geometry'
import { tierOf } from '@/utils/furniture-tier'
import { pointInPolygon, pointsToPath, polygonCentroid } from '@/utils/room-outline'
import { furnitureCatalog } from '@/data/furniture-catalog'
import type { PlanPoint } from '@/types/kitchen-types'
import PlacedFurnitureItem from './PlacedFurnitureItem.vue'

const roomStore = useRoomStore()
const furnitureStore = useFurnitureStore()
const editorStore = useEditorStore()
const { dimensions, wallThickness, floorColor, wallColor, outline } = storeToRefs(roomStore)
const { items, selectedUid, collisions } = storeToRefs(furnitureStore)
const { viewMode, snapEnabled } = storeToRefs(editorStore)

const svgRef = ref<SVGSVGElement | null>(null)
const { toPlanPoint } = useSvgPoint(svgRef)

const MARGIN = 50
const GRID_STEP = 20

const viewBox = computed(
  () =>
    `${-MARGIN} ${-MARGIN} ${dimensions.value.width + MARGIN * 2} ${
      dimensions.value.depth + MARGIN * 2
    }`
)

const floorPath = computed(() => pointsToPath(outline.value))
const gridLinesX = computed(() => buildGrid(dimensions.value.width))
const gridLinesY = computed(() => buildGrid(dimensions.value.depth))

function buildGrid(length: number): number[] {
  const lines: number[] = []
  for (let value = GRID_STEP; value < length; value += GRID_STEP) {
    lines.push(value)
  }
  return lines
}

const dragState = ref<{ uid: string; offset: PlanPoint } | null>(null)

function resolvePosition(uid: string, target: PlanPoint): PlanPoint {
  const item = items.value.find((entry) => entry.uid === uid)
  if (!item) return target
  if (!snapEnabled.value) return clampToRoom(item, target, dimensions.value)
  const neighbors = items.value.filter(
    (entry) => entry.uid !== uid && tierOf(entry.category) === tierOf(item.category)
  )
  return snapPosition(item, target, dimensions.value, neighbors)
}

function onGrab(uid: string, event: PointerEvent): void {
  furnitureStore.select(uid)
  const item = items.value.find((entry) => entry.uid === uid)
  const point = toPlanPoint(event.clientX, event.clientY)
  if (!item || !point) return
  dragState.value = {
    uid,
    offset: { x: point.x - item.position.x, y: point.y - item.position.y }
  }
  ;(event.target as Element).setPointerCapture?.(event.pointerId)
}

function onPointerMove(event: PointerEvent): void {
  const state = dragState.value
  if (!state) return
  const point = toPlanPoint(event.clientX, event.clientY)
  if (!point) return
  const next = resolvePosition(state.uid, {
    x: point.x - state.offset.x,
    y: point.y - state.offset.y
  })
  if (pointInPolygon(next, outline.value)) furnitureStore.moveTo(state.uid, next)
}

function onPointerUp(): void {
  dragState.value = null
}

function onBackgroundClick(): void {
  furnitureStore.select(null)
}

function onDragOver(event: DragEvent): void {
  event.preventDefault()
}

function onDrop(event: DragEvent): void {
  event.preventDefault()
  const blueprintId = event.dataTransfer?.getData('text/blueprint-id')
  if (!blueprintId) return
  const blueprint = furnitureCatalog.find((entry) => entry.id === blueprintId)
  const point = toPlanPoint(event.clientX, event.clientY)
  if (!blueprint || !point) return
  const footprint = { width: blueprint.width, depth: blueprint.depth, rotation: 0 }
  const neighbors = items.value.filter(
    (entry) => tierOf(entry.category) === tierOf(blueprint.category)
  )
  const target = snapEnabled.value
    ? snapPosition(footprint, point, dimensions.value, neighbors)
    : clampToRoom(footprint, point, dimensions.value)
  const safe = pointInPolygon(target, outline.value) ? target : polygonCentroid(outline.value)
  furnitureStore.addFromBlueprint(blueprint, safe)
}
</script>

<template>
  <div class="constructor-canvas" :class="`is-${viewMode}`">
    <div class="constructor-canvas__stage">
      <svg
        ref="svgRef"
        class="constructor-canvas__svg"
        :viewBox="viewBox"
        preserveAspectRatio="xMidYMid meet"
        @pointermove="onPointerMove"
        @pointerup="onPointerUp"
        @pointerleave="onPointerUp"
        @dragover="onDragOver"
        @drop="onDrop"
      >
        <defs>
          <clipPath id="floor-clip">
            <path :d="floorPath" />
          </clipPath>
        </defs>

        <path
          class="constructor-canvas__wall"
          :d="floorPath"
          fill="none"
          :stroke="wallColor"
          :stroke-width="wallThickness * 2"
          stroke-linejoin="miter"
        />
        <path
          class="constructor-canvas__floor"
          :d="floorPath"
          :fill="floorColor"
          @pointerdown="onBackgroundClick"
        />

        <g class="constructor-canvas__grid" clip-path="url(#floor-clip)">
          <line
            v-for="x in gridLinesX"
            :key="`gx-${x}`"
            :x1="x"
            y1="0"
            :x2="x"
            :y2="dimensions.depth"
          />
          <line
            v-for="y in gridLinesY"
            :key="`gy-${y}`"
            x1="0"
            :y1="y"
            :x2="dimensions.width"
            :y2="y"
          />
        </g>

        <PlacedFurnitureItem
          v-for="item in items"
          :key="item.uid"
          :item="item"
          :selected="item.uid === selectedUid"
          :colliding="collisions.has(item.uid)"
          @grab="onGrab"
        />

        <text class="constructor-canvas__dim" :x="dimensions.width / 2" :y="-18" text-anchor="middle">
          {{ dimensions.width }} см
        </text>
        <text
          class="constructor-canvas__dim"
          :x="-22"
          :y="dimensions.depth / 2"
          text-anchor="middle"
          :transform="`rotate(-90 ${-22} ${dimensions.depth / 2})`"
        >
          {{ dimensions.depth }} см
        </text>
      </svg>
    </div>
  </div>
</template>

<style scoped>
.constructor-canvas {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(circle at 50% 30%, #fbfbf9, var(--color-bg));
  overflow: hidden;
}

.constructor-canvas__stage {
  width: min(86%, 900px);
  height: min(86%, 760px);
  perspective: 1600px;
}

.constructor-canvas__svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 24px 40px rgba(20, 20, 20, 0.16));
  transition: transform 0.4s ease;
}

.is-perspective .constructor-canvas__svg {
  transform: rotateX(46deg) scale(0.92);
}

.constructor-canvas__floor {
  stroke: rgba(20, 20, 20, 0.08);
  stroke-width: 0.5;
}

.constructor-canvas__wall {
  opacity: 0.96;
}

.constructor-canvas__grid line {
  stroke: rgba(20, 20, 20, 0.06);
  stroke-width: 0.5;
}

.constructor-canvas__dim {
  font-size: 13px;
  font-weight: 600;
  fill: var(--color-ink-faint);
  user-select: none;
}
</style>
