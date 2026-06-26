<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useProjectStore } from '@/stores/project-store'
import { exampleKitchens } from '@/data/example-kitchens'
import type { ExampleKitchen } from '@/types/kitchen-types'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import ExampleKitchenCard from '@/components/home/ExampleKitchenCard.vue'

const router = useRouter()
const projectStore = useProjectStore()

function openExample(example: ExampleKitchen): void {
  projectStore.loadExample(example)
  void router.push('/constructor')
}
</script>

<template>
  <DefaultLayout>
    <section class="examples-page">
      <header class="examples-page__head">
        <p class="examples-page__eyebrow">Галерея</p>
        <h1 class="examples-page__title">Примеры кухонь</h1>
        <p class="examples-page__lead">
          Готовые планировки для разных комнат — откройте любую и доработайте под себя.
        </p>
      </header>

      <div class="examples-page__grid">
        <ExampleKitchenCard
          v-for="example in exampleKitchens"
          :key="example.id"
          :example="example"
          @open="openExample"
        />
      </div>
    </section>
  </DefaultLayout>
</template>

<style scoped>
.examples-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
}

.examples-page__eyebrow {
  font-size: 13px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--color-ink-faint);
}

.examples-page__title {
  margin-top: var(--space-3);
  font-size: clamp(30px, 4vw, 44px);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.examples-page__lead {
  margin-top: var(--space-3);
  max-width: 540px;
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-ink-soft);
}

.examples-page__grid {
  margin-top: var(--space-6);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-5);
}

@media (max-width: 980px) {
  .examples-page__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .examples-page__grid {
    grid-template-columns: 1fr;
  }
}
</style>
