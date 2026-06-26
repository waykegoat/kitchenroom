<script setup lang="ts">
import { computed } from 'vue'
import { furnitureCatalog } from '@/data/furniture-catalog'
import type { PlacedFurniture } from '@/types/kitchen-types'
import FurnitureGlyph from './FurnitureGlyph.vue'

const props = defineProps<{
  item: PlacedFurniture
  selected: boolean
  colliding: boolean
}>()

const emit = defineEmits<{
  grab: [uid: string, event: PointerEvent]
}>()

const rect = computed(() => ({
  x: props.item.position.x - props.item.width / 2,
  y: props.item.position.y - props.item.depth / 2,
  width: props.item.width,
  depth: props.item.depth
}))

const glyphType = computed(
  () => furnitureCatalog.find((entry) => entry.id === props.item.blueprintId)?.icon ?? 'cabinet'
)

const transform = computed(
  () => `rotate(${props.item.rotation} ${props.item.position.x} ${props.item.position.y})`
)

function onPointerDown(event: PointerEvent): void {
  emit('grab', props.item.uid, event)
}
</script>

<template>
  <g
    class="placed-furniture"
    :class="{ 'is-selected': selected, 'is-colliding': colliding }"
    :transform="transform"
    @pointerdown.stop="onPointerDown"
  >
    <rect
      class="placed-furniture__shadow"
      :x="rect.x + 1.5"
      :y="rect.y + 2.5"
      :width="rect.width"
      :height="rect.depth"
      rx="2"
    />

    <g :transform="`translate(${rect.x} ${rect.y})`">
      <FurnitureGlyph
        :type="glyphType"
        :width="rect.width"
        :depth="rect.depth"
        :color="item.color"
      />
    </g>

    <line
      class="placed-furniture__front"
      :x1="rect.x"
      :y1="rect.y + rect.depth"
      :x2="rect.x + rect.width"
      :y2="rect.y + rect.depth"
    />

    <rect
      class="placed-furniture__outline"
      :x="rect.x"
      :y="rect.y"
      :width="rect.width"
      :height="rect.depth"
      rx="2"
      fill="none"
    />

    <text
      class="placed-furniture__label"
      :x="item.position.x"
      :y="item.position.y"
      text-anchor="middle"
      dominant-baseline="central"
    >
      {{ item.width }}×{{ item.depth }}
    </text>
  </g>
</template>

<style scoped>
.placed-furniture {
  cursor: grab;
}

.placed-furniture:active {
  cursor: grabbing;
}

.placed-furniture__shadow {
  fill: rgba(20, 20, 20, 0.18);
}

.placed-furniture__front {
  stroke: rgba(20, 20, 20, 0.55);
  stroke-width: 1.6;
  stroke-linecap: round;
}

.placed-furniture__outline {
  stroke: transparent;
  stroke-width: 1.6;
}

.placed-furniture__label {
  font-size: 9px;
  fill: rgba(20, 20, 20, 0.55);
  pointer-events: none;
  user-select: none;
}

.is-selected .placed-furniture__outline {
  stroke: var(--color-ink);
}

.is-colliding .placed-furniture__outline {
  stroke: #c0392b;
  stroke-dasharray: 4 2;
}
</style>
