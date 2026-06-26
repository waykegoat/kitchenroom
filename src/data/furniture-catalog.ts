import type { FurnitureBlueprint } from '@/types/kitchen-types'

export const furnitureCatalog: FurnitureBlueprint[] = [
  {
    id: 'base-60',
    title: 'Нижний модуль 60',
    category: 'base-cabinet',
    width: 60,
    depth: 60,
    height: 85,
    color: '#d9d2c5',
    icon: 'cabinet',
    price: 8900
  },
  {
    id: 'base-40',
    title: 'Нижний модуль 40',
    category: 'base-cabinet',
    width: 40,
    depth: 60,
    height: 85,
    color: '#d9d2c5',
    icon: 'cabinet',
    price: 6900
  },
  {
    id: 'corner-base',
    title: 'Угловой модуль',
    category: 'base-cabinet',
    width: 90,
    depth: 90,
    height: 85,
    color: '#cfc7b8',
    icon: 'corner',
    price: 12900
  },
  {
    id: 'wall-60',
    title: 'Верхний шкаф 60',
    category: 'wall-cabinet',
    width: 60,
    depth: 35,
    height: 72,
    color: '#e7e1d6',
    icon: 'cabinet',
    price: 6500
  },
  {
    id: 'tall-pantry',
    title: 'Пенал высокий',
    category: 'tall-cabinet',
    width: 60,
    depth: 60,
    height: 210,
    color: '#c8bfae',
    icon: 'tall',
    price: 15900
  },
  {
    id: 'sink-80',
    title: 'Мойка 80',
    category: 'sink',
    width: 80,
    depth: 60,
    height: 85,
    color: '#b9c2c6',
    icon: 'sink',
    price: 11200
  },
  {
    id: 'stove-60',
    title: 'Плита 60',
    category: 'appliance',
    width: 60,
    depth: 60,
    height: 85,
    color: '#2c2c2c',
    icon: 'stove',
    price: 24900
  },
  {
    id: 'fridge-70',
    title: 'Холодильник 70',
    category: 'appliance',
    width: 70,
    depth: 70,
    height: 200,
    color: '#cdd2d4',
    icon: 'fridge',
    price: 39900
  },
  {
    id: 'island-120',
    title: 'Остров 120',
    category: 'island',
    width: 120,
    depth: 80,
    height: 90,
    color: '#d4cdbf',
    icon: 'island',
    price: 28900
  }
]

export const catalogByCategory = furnitureCatalog.reduce<Record<string, FurnitureBlueprint[]>>(
  (groups, item) => {
    ;(groups[item.category] ??= []).push(item)
    return groups
  },
  {}
)
