import type { MaterialFinish } from '@/types/kitchen-types'

export const materialFinishes: MaterialFinish[] = [
  { id: 'oak-light', title: 'Светлый дуб', color: '#d9d2c5', priceFactor: 1 },
  { id: 'sand', title: 'Песочный', color: '#e7e1d6', priceFactor: 1 },
  { id: 'clay', title: 'Глина', color: '#cfc7b8', priceFactor: 1.05 },
  { id: 'graphite', title: 'Графит', color: '#2c2c2c', priceFactor: 1.15 },
  { id: 'steel', title: 'Сталь', color: '#cdd2d4', priceFactor: 1.2 },
  { id: 'sage', title: 'Шалфей', color: '#c3cabb', priceFactor: 1.1 }
]

export const defaultFinishId = materialFinishes[0].id

export function findFinish(id: string): MaterialFinish {
  return materialFinishes.find((finish) => finish.id === id) ?? materialFinishes[0]
}

export function matchFinishByColor(color: string): string {
  const found = materialFinishes.find(
    (finish) => finish.color.toLowerCase() === color.toLowerCase()
  )
  return found ? found.id : defaultFinishId
}
