import { computed, type ComputedRef } from 'vue'
import { storeToRefs } from 'pinia'
import { useFurnitureStore } from '@/stores/furniture-store'
import { findFinish } from '@/data/material-finishes'

export interface EstimateRow {
  title: string
  finishTitle: string
  count: number
  total: number
}

export function useEstimate(): {
  rows: ComputedRef<EstimateRow[]>
  total: ComputedRef<number>
} {
  const furnitureStore = useFurnitureStore()
  const { items, totalPrice } = storeToRefs(furnitureStore)

  const rows = computed<EstimateRow[]>(() => {
    const map = new Map<string, EstimateRow>()
    for (const item of items.value) {
      const finish = findFinish(item.materialId)
      const price = Math.round(item.basePrice * finish.priceFactor)
      const key = `${item.title}-${item.materialId}`
      const existing = map.get(key)
      if (existing) {
        existing.count += 1
        existing.total += price
      } else {
        map.set(key, { title: item.title, finishTitle: finish.title, count: 1, total: price })
      }
    }
    return [...map.values()]
  })

  return { rows, total: totalPrice }
}
