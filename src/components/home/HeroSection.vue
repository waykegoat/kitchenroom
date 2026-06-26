<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BaseButton from '@/components/common/BaseButton.vue'
</script>

<template>
  <section class="hero-section">
    <div class="hero-section__content">
      <p class="hero-section__eyebrow">Онлайн-конструктор</p>
      <h1 class="hero-section__title">
        Спроектируйте свою кухню<br />
        за несколько минут
      </h1>
      <p class="hero-section__subtitle">
        Создайте комнату, задайте точные размеры в сантиметрах и расставьте мебель
        в наглядном 2D-плане с эффектом объёма.
      </p>
      <div class="hero-section__actions">
        <RouterLink to="/constructor">
          <BaseButton size="lg">Открыть конструктор</BaseButton>
        </RouterLink>
        <RouterLink to="/examples">
          <BaseButton size="lg" variant="outline">Смотреть примеры</BaseButton>
        </RouterLink>
      </div>
    </div>

    <div class="hero-section__preview">
      <div class="hero-section__room">
        <div class="hero-section__counter"></div>
        <div class="hero-section__module"></div>
        <div class="hero-section__module is-tall"></div>
        <div class="hero-section__island"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: var(--space-8);
  align-items: center;
  padding: var(--space-8) var(--space-6);
  max-width: 1200px;
  margin: 0 auto;
}

.hero-section__eyebrow {
  font-size: 13px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-ink-faint);
  margin-bottom: var(--space-4);
}

.hero-section__title {
  font-size: clamp(32px, 4.5vw, 54px);
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -0.02em;
}

.hero-section__subtitle {
  margin-top: var(--space-5);
  max-width: 460px;
  font-size: 17px;
  line-height: 1.6;
  color: var(--color-ink-soft);
}

.hero-section__actions {
  display: flex;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.hero-section__preview {
  display: flex;
  justify-content: center;
}

.hero-section__room {
  position: relative;
  width: 100%;
  max-width: 440px;
  aspect-ratio: 4 / 3;
  border-radius: var(--radius-lg);
  background:
    linear-gradient(160deg, #efeae0, #e3ddd0);
  box-shadow: var(--shadow-lg);
  overflow: hidden;
}

.hero-section__counter {
  position: absolute;
  left: 8%;
  bottom: 14%;
  width: 60%;
  height: 14%;
  border-radius: 4px;
  background-color: #cfc6b5;
  box-shadow: 0 8px 18px rgba(20, 20, 20, 0.18);
}

.hero-section__module {
  position: absolute;
  left: 8%;
  top: 20%;
  width: 22%;
  height: 18%;
  border-radius: 4px;
  background-color: #e7e1d6;
  box-shadow: var(--shadow-md);
}

.hero-section__module.is-tall {
  left: 72%;
  top: 18%;
  height: 60%;
  background-color: #c8bfae;
}

.hero-section__island {
  position: absolute;
  left: 30%;
  bottom: 14%;
  width: 34%;
  height: 22%;
  border-radius: 6px;
  background-color: var(--color-ink);
  box-shadow: 0 14px 28px rgba(20, 20, 20, 0.28);
}

@media (max-width: 860px) {
  .hero-section {
    grid-template-columns: 1fr;
  }
}
</style>
