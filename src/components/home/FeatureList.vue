<script setup lang="ts">
import FeatureCard from './FeatureCard.vue'

interface Feature {
  index: string
  title: string
  description: string
}

const features: Feature[] = [
  {
    index: '01',
    title: 'Гибкая комната',
    description: 'Задавайте ширину и глубину помещения в сантиметрах и сразу видьте масштаб.'
  },
  {
    index: '02',
    title: 'Каталог мебели',
    description: 'Нижние и верхние модули, пеналы, техника, мойки и острова — перетаскивайте на план.'
  },
  {
    index: '03',
    title: 'Объёмный вид',
    description: 'Плоский 2D-план с тенями и стенами создаёт ощущение трёхмерного пространства.'
  }
]
</script>

<template>
  <section class="feature-list">
    <header class="feature-list__head">
      <h2 class="feature-list__title">Всё для проектирования кухни</h2>
      <p class="feature-list__lead">
        Простые инструменты, точные размеры и понятный результат.
      </p>
    </header>

    <div class="feature-list__grid">
      <FeatureCard
        v-for="feature in features"
        :key="feature.index"
        :index="feature.index"
        :title="feature.title"
        :description="feature.description"
      />
    </div>
  </section>
</template>

<style scoped>
.feature-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
}

.feature-list__title {
  font-size: clamp(26px, 3vw, 38px);
  font-weight: 700;
  letter-spacing: -0.01em;
}

.feature-list__lead {
  margin-top: var(--space-3);
  font-size: 16px;
  color: var(--color-ink-soft);
}

.feature-list__grid {
  margin-top: var(--space-6);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

@media (max-width: 860px) {
  .feature-list__grid {
    grid-template-columns: 1fr;
  }
}
</style>
