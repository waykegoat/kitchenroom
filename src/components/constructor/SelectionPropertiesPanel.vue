<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useFurnitureStore } from '@/stores/furniture-store'
import { findFinish } from '@/data/material-finishes'
import { formatPrice } from '@/utils/format-price'
import BaseButton from '@/components/common/BaseButton.vue'
import DimensionInputRow from './DimensionInputRow.vue'
import MaterialPicker from './MaterialPicker.vue'

const furnitureStore = useFurnitureStore()
const { selectedItem } = storeToRefs(furnitureStore)

function itemPrice(basePrice: number, materialId: string): number {
  return Math.round(basePrice * findFinish(materialId).priceFactor)
}
</script>

<template>
  <section class="selection-properties-panel">
    <h3 class="selection-properties-panel__title">Выбранный объект</h3>

    <div v-if="selectedItem" class="selection-properties-panel__body">
      <p class="selection-properties-panel__name">{{ selectedItem.title }}</p>

      <div class="selection-properties-panel__rows">
        <DimensionInputRow
          label="Ширина"
          :model-value="selectedItem.width"
          :min="20"
          :max="300"
          :step="5"
          unit="см"
          @update:model-value="(value) => furnitureStore.resizeSelected({ width: value })"
        />
        <DimensionInputRow
          label="Глубина"
          :model-value="selectedItem.depth"
          :min="20"
          :max="300"
          :step="5"
          unit="см"
          @update:model-value="(value) => furnitureStore.resizeSelected({ depth: value })"
        />
      </div>

      <div class="selection-properties-panel__material">
        <span class="selection-properties-panel__label">Материал</span>
        <MaterialPicker
          :selected-id="selectedItem.materialId"
          @select="furnitureStore.setSelectedMaterial"
        />
      </div>

      <div class="selection-properties-panel__price">
        <span>Цена</span>
        <strong>{{ formatPrice(itemPrice(selectedItem.basePrice, selectedItem.materialId)) }}</strong>
      </div>

      <div class="selection-properties-panel__layers">
        <span class="selection-properties-panel__label">Слой</span>
        <div class="selection-properties-panel__layer-buttons">
          <BaseButton size="sm" variant="outline" @click="furnitureStore.moveLayer('back')">
            В самый низ
          </BaseButton>
          <BaseButton size="sm" variant="outline" @click="furnitureStore.moveLayer('backward')">
            Ниже
          </BaseButton>
          <BaseButton size="sm" variant="outline" @click="furnitureStore.moveLayer('forward')">
            Выше
          </BaseButton>
          <BaseButton size="sm" variant="outline" @click="furnitureStore.moveLayer('front')">
            В самый верх
          </BaseButton>
        </div>
      </div>

      <div class="selection-properties-panel__actions">
        <BaseButton size="sm" variant="outline" @click="furnitureStore.rotateSelected()">
          Повернуть
        </BaseButton>
        <BaseButton size="sm" variant="outline" @click="furnitureStore.duplicateSelected()">
          Дублировать
        </BaseButton>
        <BaseButton size="sm" variant="ghost" @click="furnitureStore.removeSelected()">
          Удалить
        </BaseButton>
      </div>
    </div>

    <p v-else class="selection-properties-panel__empty">
      Выберите объект на плане, чтобы изменить его.
    </p>
  </section>
</template>

<style scoped>
.selection-properties-panel {
  padding: var(--space-5);
  border-bottom: 1px solid var(--color-border);
}

.selection-properties-panel__title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: var(--space-4);
}

.selection-properties-panel__name {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: var(--space-4);
}

.selection-properties-panel__rows {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.selection-properties-panel__material {
  margin-top: var(--space-5);
}

.selection-properties-panel__label {
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--color-ink-faint);
  margin-bottom: var(--space-3);
}

.selection-properties-panel__price {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--space-5);
  padding-top: var(--space-4);
  border-top: 1px dashed var(--color-border);
  font-size: 14px;
  color: var(--color-ink-soft);
}

.selection-properties-panel__layers {
  margin-top: var(--space-5);
}

.selection-properties-panel__layer-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2);
}

.selection-properties-panel__actions {
  display: flex;
  gap: var(--space-2);
  margin-top: var(--space-5);
}

.selection-properties-panel__empty {
  font-size: 13px;
  line-height: 1.6;
  color: var(--color-ink-faint);
}
</style>
