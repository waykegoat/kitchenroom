<script setup lang="ts">
import { computed } from 'vue'
import { buildOutline, pointsToPath } from '@/utils/room-outline'
import type { PlacedFurniture, RoomDimensions, RoomShape } from '@/types/kitchen-types'
import { furnitureCatalog } from '@/data/furniture-catalog'
import FurnitureGlyph from './FurnitureGlyph.vue'

const props = withDefaults(
  defineProps<{
    dimensions: RoomDimensions
    shape: RoomShape
    notchWidth: number
    notchDepth: number
    items: PlacedFurniture[]
    floorColor?: string
    wallColor?: string
    wallThickness?: number
  }>(),
  {
    floorColor: '#e9e2d6',
    wallColor: '#d8d6cf',
    wallThickness: 12
  }
)

const MARGIN = 40

const viewBox = computed(
  () =>
    `${-MARGIN} ${-MARGIN} ${props.dimensions.width + MARGIN * 2} ${
      props.dimensions.depth + MARGIN * 2
    }`
)

const floorPath = computed(() =>
  pointsToPath(
    buildOutline({
      shape: props.shape,
      width: props.dimensions.width,
      depth: props.dimensions.depth,
      notchWidth: props.notchWidth,
      notchDepth: props.notchDepth
    })
  )
)

function glyphType(blueprintId: string): string {
  return furnitureCatalog.find((entry) => entry.id === blueprintId)?.icon ?? 'cabinet'
}
</script>

<template>
  <svg class="kitchen-plan-thumbnail" :viewBox="viewBox" preserveAspectRatio="xMidYMid meet">
    <path
      :d="floorPath"
      fill="none"
      :stroke="wallColor"
      :stroke-width="wallThickness * 2"
      stroke-linejoin="miter"
    />
    <path :d="floorPath" :fill="floorColor" />

    <g
      v-for="item in items"
      :key="item.uid"
      :transform="`rotate(${item.rotation} ${item.position.x} ${item.position.y})`"
    >
      <g :transform="`translate(${item.position.x - item.width / 2} ${item.position.y - item.depth / 2})`">
        <FurnitureGlyph
          :type="glyphType(item.blueprintId)"
          :width="item.width"
          :depth="item.depth"
          :color="item.color"
        />
      </g>
    </g>
  </svg>
</template>

<style scoped>
.kitchen-plan-thumbnail {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
