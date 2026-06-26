<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'
</script>

<template>
  <section class="call-to-action">
    <div class="call-to-action__inner">
      <h2 class="call-to-action__title">Готовы начать проект?</h2>
      <p class="call-to-action__text">
        Откройте конструктор и соберите кухню под свои размеры прямо сейчас.
      </p>
      <RouterLink to="/constructor">
        <BaseButton size="lg" variant="contrast">Перейти в конструктор</BaseButton>
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.call-to-action {
  padding: var(--space-8) var(--space-6);
}

.call-to-action__inner {
  max-width: 760px;
  margin: 0 auto;
  padding: var(--space-8);
  text-align: center;
  border-radius: var(--radius-lg);
  background-color: var(--color-ink);
  color: var(--color-accent-contrast);
}

.call-to-action__title {
  font-size: clamp(26px, 3vw, 36px);
  font-weight: 700;
}

.call-to-action__text {
  margin: var(--space-4) 0 var(--space-6);
  font-size: 16px;
  color: rgba(255, 255, 255, 0.72);
}
</style>
