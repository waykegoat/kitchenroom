<script setup lang="ts">
import { materialFinishes } from '@/data/material-finishes'

defineProps<{
  selectedId: string
}>()

const emit = defineEmits<{
  select: [materialId: string]
}>()
</script>

<template>
  <div class="material-picker">
    <button
      v-for="finish in materialFinishes"
      :key="finish.id"
      class="material-picker__swatch"
      :class="{ 'is-active': finish.id === selectedId }"
      :style="{ backgroundColor: finish.color }"
      :title="finish.title"
      @click="emit('select', finish.id)"
    ></button>
  </div>
</template>

<style scoped>
.material-picker {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.material-picker__swatch {
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 2px solid var(--color-border);
  transition: transform 0.12s ease, border-color 0.12s ease;
}

.material-picker__swatch:hover {
  transform: translateY(-1px);
}

.material-picker__swatch.is-active {
  border-color: var(--color-ink);
  box-shadow: 0 0 0 2px var(--color-surface), 0 0 0 4px var(--color-ink);
}
</style>
