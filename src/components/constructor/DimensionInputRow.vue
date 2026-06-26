<script setup lang="ts">
const props = defineProps<{
  label: string
  modelValue: number
  min: number
  max: number
  step?: number
  unit?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

function onInput(event: Event): void {
  const value = Number((event.target as HTMLInputElement).value)
  emit('update:modelValue', value)
}
</script>

<template>
  <label class="dimension-input-row">
    <span class="dimension-input-row__label">{{ props.label }}</span>
    <span class="dimension-input-row__control">
      <input
        class="dimension-input-row__field"
        type="number"
        :value="props.modelValue"
        :min="props.min"
        :max="props.max"
        :step="props.step ?? 1"
        @input="onInput"
      />
      <span v-if="props.unit" class="dimension-input-row__unit">{{ props.unit }}</span>
    </span>
  </label>
</template>

<style scoped>
.dimension-input-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.dimension-input-row__label {
  font-size: 14px;
  color: var(--color-ink-soft);
}

.dimension-input-row__control {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: 6px 10px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background-color: var(--color-surface);
}

.dimension-input-row__control:focus-within {
  border-color: var(--color-ink);
}

.dimension-input-row__field {
  width: 64px;
  border: none;
  outline: none;
  font-size: 14px;
  font-weight: 600;
  text-align: right;
  background: transparent;
  color: var(--color-ink);
}

.dimension-input-row__unit {
  font-size: 12px;
  color: var(--color-ink-faint);
}
</style>
