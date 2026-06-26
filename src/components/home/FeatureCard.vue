<script setup lang="ts">
defineProps<{
  index: string
  title: string
  description: string
}>()
</script>

<template>
  <article class="feature-card">
    <span class="feature-card__index">{{ index }}</span>
    <h3 class="feature-card__title">{{ title }}</h3>
    <p class="feature-card__description">{{ description }}</p>
  </article>
</template>

<style scoped>
.feature-card {
  padding: var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.feature-card:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.feature-card__index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background-color: var(--color-ink);
  color: var(--color-accent-contrast);
  font-size: 14px;
  font-weight: 700;
}

.feature-card__title {
  margin-top: var(--space-4);
  font-size: 19px;
  font-weight: 600;
}

.feature-card__description {
  margin-top: var(--space-2);
  font-size: 15px;
  line-height: 1.6;
  color: var(--color-ink-soft);
}
</style>
