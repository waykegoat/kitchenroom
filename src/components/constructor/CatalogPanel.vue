<script setup lang="ts">
import { computed } from 'vue'
import { furnitureCatalog } from '@/data/furniture-catalog'
import { useRoomStore } from '@/stores/room-store'
import { useFurnitureStore } from '@/stores/furniture-store'
import { centerOfRoom } from '@/utils/plan-geometry'
import type { FurnitureBlueprint, FurnitureCategory } from '@/types/kitchen-types'
import CatalogItemCard from './CatalogItemCard.vue'

const roomStore = useRoomStore()
const furnitureStore = useFurnitureStore()

const categoryLabels: Record<FurnitureCategory, string> = {
  'base-cabinet': 'Нижние модули',
  'wall-cabinet': 'Верхние модули',
  'tall-cabinet': 'Пеналы',
  appliance: 'Техника',
  sink: 'Мойки',
  island: 'Острова'
}

const groups = computed(() => {
  const order: FurnitureCategory[] = [
    'base-cabinet',
    'wall-cabinet',
    'tall-cabinet',
    'appliance',
    'sink',
    'island'
  ]
  return order
    .map((category) => ({
      category,
      label: categoryLabels[category],
      blueprints: furnitureCatalog.filter((item) => item.category === category)
    }))
    .filter((group) => group.blueprints.length > 0)
})

function onPlace(blueprint: FurnitureBlueprint): void {
  furnitureStore.addFromBlueprint(blueprint, centerOfRoom(roomStore.dimensions))
}
</script>

<template>
  <aside class="catalog-panel">
    <header class="catalog-panel__head">
      <h2 class="catalog-panel__title">Каталог</h2>
      <p class="catalog-panel__hint">Перетащите на план или дважды кликните</p>
    </header>

    <div class="catalog-panel__scroll">
      <section v-for="group in groups" :key="group.category" class="catalog-panel__group">
        <h3 class="catalog-panel__group-title">{{ group.label }}</h3>
        <div class="catalog-panel__items">
          <CatalogItemCard
            v-for="blueprint in group.blueprints"
            :key="blueprint.id"
            :blueprint="blueprint"
            @place="onPlace"
          />
        </div>
      </section>
    </div>
  </aside>
</template>

<style scoped>
.catalog-panel {
  display: flex;
  flex-direction: column;
  width: 280px;
  flex-shrink: 0;
  background-color: var(--color-surface);
  border-right: 1px solid var(--color-border);
}

.catalog-panel__head {
  padding: var(--space-5);
  border-bottom: 1px solid var(--color-border);
}

.catalog-panel__title {
  font-size: 17px;
  font-weight: 700;
}

.catalog-panel__hint {
  margin-top: var(--space-1);
  font-size: 12px;
  color: var(--color-ink-faint);
}

.catalog-panel__scroll {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-4);
}

.catalog-panel__group + .catalog-panel__group {
  margin-top: var(--space-5);
}

.catalog-panel__group-title {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-ink-faint);
  margin-bottom: var(--space-3);
}

.catalog-panel__items {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
</style>
