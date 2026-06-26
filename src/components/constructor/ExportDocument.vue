<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoomStore } from '@/stores/room-store'
import { useFurnitureStore } from '@/stores/furniture-store'
import { useProjectStore } from '@/stores/project-store'
import { useEstimate } from '@/composables/use-estimate'
import { pointsToPath } from '@/utils/room-outline'
import { formatPrice } from '@/utils/format-price'
import PlacedFurnitureItem from './PlacedFurnitureItem.vue'

const roomStore = useRoomStore()
const furnitureStore = useFurnitureStore()
const projectStore = useProjectStore()
const { dimensions, wallThickness, floorColor, wallColor, outline, areaSquareMeters } =
  storeToRefs(roomStore)
const { items } = storeToRefs(furnitureStore)
const { currentName } = storeToRefs(projectStore)
const { rows, total } = useEstimate()

const MARGIN = 40

const viewBox = computed(
  () =>
    `${-MARGIN} ${-MARGIN} ${dimensions.value.width + MARGIN * 2} ${
      dimensions.value.depth + MARGIN * 2
    }`
)

const floorPath = computed(() => pointsToPath(outline.value))

const printedAt = new Date().toLocaleDateString('ru-RU', {
  day: '2-digit',
  month: 'long',
  year: 'numeric'
})

function noop(): void {}
</script>

<template>
  <div class="export-document">
    <header class="export-document__head">
      <div>
        <h1 class="export-document__title">{{ currentName }}</h1>
        <p class="export-document__meta">КУХНИ ДЕЛИЯ · {{ printedAt }}</p>
      </div>
      <div class="export-document__summary">
        <span>{{ dimensions.width }}×{{ dimensions.depth }} см</span>
        <strong>{{ areaSquareMeters.toFixed(2) }} м²</strong>
      </div>
    </header>

    <svg class="export-document__plan" :viewBox="viewBox" preserveAspectRatio="xMidYMid meet">
      <path
        :d="floorPath"
        fill="none"
        :stroke="wallColor"
        :stroke-width="wallThickness * 2"
        stroke-linejoin="miter"
      />
      <path :d="floorPath" :fill="floorColor" />
      <PlacedFurnitureItem
        v-for="item in items"
        :key="item.uid"
        :item="item"
        :selected="false"
        :colliding="false"
        @grab="noop"
      />
    </svg>

    <section class="export-document__estimate">
      <h2 class="export-document__estimate-title">Смета</h2>
      <table class="export-document__table">
        <thead>
          <tr>
            <th>Наименование</th>
            <th>Материал</th>
            <th>Кол-во</th>
            <th>Стоимость</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="`${row.title}-${row.finishTitle}`">
            <td>{{ row.title }}</td>
            <td>{{ row.finishTitle }}</td>
            <td>{{ row.count }}</td>
            <td>{{ formatPrice(row.total) }}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">Итого</td>
            <td>{{ formatPrice(total) }}</td>
          </tr>
        </tfoot>
      </table>
    </section>
  </div>
</template>

<style scoped>
.export-document {
  display: none;
}

.export-document__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 2px solid #141414;
}

.export-document__title {
  font-size: 24px;
  font-weight: 700;
}

.export-document__meta {
  margin-top: 4px;
  font-size: 13px;
  color: #6a6a6a;
}

.export-document__summary {
  text-align: right;
  font-size: 14px;
}

.export-document__summary strong {
  display: block;
  font-size: 20px;
}

.export-document__plan {
  width: 100%;
  max-height: 440px;
  margin: 24px 0;
}

.export-document__estimate-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 12px;
}

.export-document__table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.export-document__table th,
.export-document__table td {
  text-align: left;
  padding: 8px 10px;
  border-bottom: 1px solid #e2e2dd;
}

.export-document__table th:last-child,
.export-document__table td:last-child {
  text-align: right;
}

.export-document__table tfoot td {
  font-weight: 700;
  font-size: 15px;
  border-bottom: none;
  border-top: 2px solid #141414;
}
</style>
