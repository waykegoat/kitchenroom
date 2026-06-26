<script setup lang="ts">
import { RouterLink } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import BaseButton from '@/components/common/BaseButton.vue'
</script>

<template>
  <DefaultLayout>
    <section class="not-found-page">
      <p class="not-found-page__code">404</p>
      <h1 class="not-found-page__title">Страница не найдена</h1>
      <RouterLink to="/">
        <BaseButton>На главную</BaseButton>
      </RouterLink>
    </section>
  </DefaultLayout>
</template>

<style scoped>
.not-found-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  padding: var(--space-8);
  min-height: 60vh;
  text-align: center;
}

.not-found-page__code {
  font-size: 96px;
  font-weight: 800;
  letter-spacing: -0.04em;
}

.not-found-page__title {
  font-size: 22px;
  color: var(--color-ink-soft);
}
</style>
