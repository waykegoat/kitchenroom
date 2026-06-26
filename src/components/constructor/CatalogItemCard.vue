<script setup lang="ts">
import type { FurnitureBlueprint } from '@/types/kitchen-types'
import FurnitureGlyph from './FurnitureGlyph.vue'

const props = defineProps<{
  blueprint: FurnitureBlueprint
}>()

const emit = defineEmits<{
  place: [blueprint: FurnitureBlueprint]
}>()

function onDragStart(event: DragEvent): void {
  event.dataTransfer?.setData('text/blueprint-id', props.blueprint.id)
  if (event.dataTransfer) event.dataTransfer.effectAllowed = 'copy'
}
</script>

<template>
  <button
    class="catalog-item-card"
    draggable="true"
    @dragstart="onDragStart"
    @dblclick="emit('place', blueprint)"
  >
    <span class="catalog-item-card__preview">
      <svg
        :viewBox="`0 0 ${blueprint.width} ${blueprint.depth}`"
        preserveAspectRatio="xMidYMid meet"
      >
        <FurnitureGlyph
          :type="blueprint.icon"
          :width="blueprint.width"
          :depth="blueprint.depth"
          :color="blueprint.color"
        />
      </svg>
    </span>
    <span class="catalog-item-card__info">
      <span class="catalog-item-card__title">{{ blueprint.title }}</span>
      <span class="catalog-item-card__size">{{ blueprint.width }}×{{ blueprint.depth }} см</span>
    </span>
  </button>
</template>

<style scoped>
.catalog-item-card {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  width: 100%;
  padding: var(--space-3);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  text-align: left;
  transition: border-color 0.16s ease, box-shadow 0.16s ease;
}

.catalog-item-card:hover {
  border-color: var(--color-ink);
  box-shadow: var(--shadow-sm);
}

.catalog-item-card__preview {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.catalog-item-card__preview svg {
  width: 100%;
  height: 100%;
}

.catalog-item-card__info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.catalog-item-card__title {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-ink);
}

.catalog-item-card__size {
  font-size: 12px;
  color: var(--color-ink-faint);
}
</style>
