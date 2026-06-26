<script setup lang="ts">
import { computed } from 'vue'
import { buildOutline, polygonArea } from '@/utils/room-outline'
import type { ExampleKitchen } from '@/types/kitchen-types'
import KitchenPlanThumbnail from '@/components/constructor/KitchenPlanThumbnail.vue'
import BaseButton from '@/components/common/BaseButton.vue'

const props = defineProps<{
  example: ExampleKitchen
}>()

const emit = defineEmits<{
  open: [example: ExampleKitchen]
}>()

const area = computed(() => {
  const outline = buildOutline({
    shape: props.example.shape,
    width: props.example.dimensions.width,
    depth: props.example.dimensions.depth,
    notchWidth: props.example.notchWidth,
    notchDepth: props.example.notchDepth
  })
  return (polygonArea(outline) / 10000).toFixed(1)
})
</script>

<template>
  <article class="example-kitchen-card">
    <div class="example-kitchen-card__preview">
      <KitchenPlanThumbnail
        :dimensions="example.dimensions"
        :shape="example.shape"
        :notch-width="example.notchWidth"
        :notch-depth="example.notchDepth"
        :items="example.items"
      />
    </div>

    <div class="example-kitchen-card__body">
      <div class="example-kitchen-card__head">
        <h3 class="example-kitchen-card__title">{{ example.title }}</h3>
        <span class="example-kitchen-card__style">{{ example.style }}</span>
      </div>
      <p class="example-kitchen-card__description">{{ example.description }}</p>
      <div class="example-kitchen-card__meta">
        <span>{{ example.dimensions.width }}×{{ example.dimensions.depth }} см</span>
        <span>{{ area }} м²</span>
        <span>{{ example.items.length }} модулей</span>
      </div>
      <BaseButton size="sm" @click="emit('open', example)">Открыть в конструкторе</BaseButton>
    </div>
  </article>
</template>

<style scoped>
.example-kitchen-card {
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.example-kitchen-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.example-kitchen-card__preview {
  aspect-ratio: 4 / 3;
  padding: var(--space-4);
  background:
    radial-gradient(circle at 50% 35%, #fbfbf9, var(--color-surface-muted));
  border-bottom: 1px solid var(--color-border);
}

.example-kitchen-card__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-5);
}

.example-kitchen-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-3);
}

.example-kitchen-card__title {
  font-size: 18px;
  font-weight: 700;
}

.example-kitchen-card__style {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-ink-faint);
  padding: 4px 10px;
  border: 1px solid var(--color-border);
  border-radius: 999px;
  white-space: nowrap;
}

.example-kitchen-card__description {
  font-size: 14px;
  line-height: 1.55;
  color: var(--color-ink-soft);
}

.example-kitchen-card__meta {
  display: flex;
  gap: var(--space-4);
  font-size: 13px;
  color: var(--color-ink-faint);
}
</style>
