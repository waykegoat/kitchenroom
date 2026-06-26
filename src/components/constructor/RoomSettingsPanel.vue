<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useRoomStore } from '@/stores/room-store'
import type { RoomShape } from '@/types/kitchen-types'
import DimensionInputRow from './DimensionInputRow.vue'

const roomStore = useRoomStore()
const { dimensions, shape, notchWidth, notchDepth, areaSquareMeters } = storeToRefs(roomStore)

const shapes: { value: RoomShape; label: string }[] = [
  { value: 'rectangle', label: 'Прямоуг.' },
  { value: 'l-shape', label: 'Г-образ.' },
  { value: 'u-shape', label: 'П-образ.' }
]
</script>

<template>
  <section class="room-settings-panel">
    <h3 class="room-settings-panel__title">Параметры комнаты</h3>

    <div class="room-settings-panel__shapes">
      <button
        v-for="option in shapes"
        :key="option.value"
        class="room-settings-panel__shape"
        :class="{ 'is-active': option.value === shape }"
        @click="roomStore.setShape(option.value)"
      >
        {{ option.label }}
      </button>
    </div>

    <div class="room-settings-panel__rows">
      <DimensionInputRow
        label="Ширина"
        :model-value="dimensions.width"
        :min="150"
        :max="1000"
        :step="5"
        unit="см"
        @update:model-value="roomStore.setWidth"
      />
      <DimensionInputRow
        label="Глубина"
        :model-value="dimensions.depth"
        :min="150"
        :max="1000"
        :step="5"
        unit="см"
        @update:model-value="roomStore.setDepth"
      />
      <DimensionInputRow
        label="Высота стен"
        :model-value="dimensions.wallHeight"
        :min="200"
        :max="400"
        :step="5"
        unit="см"
        @update:model-value="roomStore.setWallHeight"
      />

      <template v-if="shape !== 'rectangle'">
        <DimensionInputRow
          label="Вырез: ширина"
          :model-value="notchWidth"
          :min="40"
          :max="dimensions.width - 40"
          :step="5"
          unit="см"
          @update:model-value="roomStore.setNotchWidth"
        />
        <DimensionInputRow
          label="Вырез: глубина"
          :model-value="notchDepth"
          :min="40"
          :max="dimensions.depth - 40"
          :step="5"
          unit="см"
          @update:model-value="roomStore.setNotchDepth"
        />
      </template>
    </div>

    <div class="room-settings-panel__area">
      <span>Площадь</span>
      <strong>{{ areaSquareMeters.toFixed(2) }} м²</strong>
    </div>
  </section>
</template>

<style scoped>
.room-settings-panel {
  padding: var(--space-5);
  border-bottom: 1px solid var(--color-border);
}

.room-settings-panel__title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: var(--space-4);
}

.room-settings-panel__shapes {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.room-settings-panel__shape {
  flex: 1;
  padding: 8px 4px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: transparent;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-ink-faint);
  transition: border-color 0.16s ease, color 0.16s ease, background-color 0.16s ease;
}

.room-settings-panel__shape.is-active {
  background-color: var(--color-ink);
  border-color: var(--color-ink);
  color: var(--color-accent-contrast);
}

.room-settings-panel__rows {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.room-settings-panel__area {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px dashed var(--color-border);
  font-size: 14px;
  color: var(--color-ink-soft);
}
</style>
