import type { FurnitureCategory } from '@/types/kitchen-types'

export type FurnitureTier = 'floor' | 'wall'

export function tierOf(category: FurnitureCategory): FurnitureTier {
  return category === 'wall-cabinet' ? 'wall' : 'floor'
}
