<script setup lang="ts">
import { formatPrice } from '@/utils/format-price'
import { useEstimate } from '@/composables/use-estimate'

const { rows, total: totalPrice } = useEstimate()
</script>

<template>
  <section class="estimate-summary">
    <h3 class="estimate-summary__title">Смета</h3>

    <ul v-if="rows.length" class="estimate-summary__list">
      <li v-for="row in rows" :key="`${row.title}-${row.finishTitle}`" class="estimate-summary__row">
        <span class="estimate-summary__name">{{ row.title }}</span>
        <span class="estimate-summary__count">×{{ row.count }}</span>
        <span class="estimate-summary__sum">{{ formatPrice(row.total) }}</span>
      </li>
    </ul>
    <p v-else class="estimate-summary__empty">Добавьте мебель, чтобы рассчитать стоимость.</p>

    <div class="estimate-summary__total">
      <span>Итого</span>
      <strong>{{ formatPrice(totalPrice) }}</strong>
    </div>
  </section>
</template>

<style scoped>
.estimate-summary {
  padding: var(--space-5);
}

.estimate-summary__title {
  font-size: 15px;
  font-weight: 700;
  margin-bottom: var(--space-4);
}

.estimate-summary__list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.estimate-summary__row {
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: var(--space-3);
  font-size: 13px;
}

.estimate-summary__name {
  color: var(--color-ink-soft);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.estimate-summary__count {
  color: var(--color-ink-faint);
}

.estimate-summary__sum {
  font-weight: 600;
}

.estimate-summary__empty {
  font-size: 13px;
  line-height: 1.6;
  color: var(--color-ink-faint);
}

.estimate-summary__total {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: var(--space-4);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
  font-size: 15px;
}

.estimate-summary__total strong {
  font-size: 17px;
}
</style>
