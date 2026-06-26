import type { ExampleKitchen, PlacedFurniture } from '@/types/kitchen-types'
import { furnitureCatalog } from './furniture-catalog'
import { defaultFinishId, findFinish } from './material-finishes'

let counter = 0

function place(
  blueprintId: string,
  x: number,
  y: number,
  rotation = 0,
  materialId: string = defaultFinishId
): PlacedFurniture {
  const blueprint = furnitureCatalog.find((entry) => entry.id === blueprintId)
  if (!blueprint) throw new Error(`Unknown blueprint: ${blueprintId}`)
  counter += 1
  return {
    uid: `example-${blueprintId}-${counter}`,
    blueprintId: blueprint.id,
    title: blueprint.title,
    category: blueprint.category,
    position: { x, y },
    width: blueprint.width,
    depth: blueprint.depth,
    height: blueprint.height,
    rotation,
    color: findFinish(materialId).color,
    materialId,
    basePrice: blueprint.price
  }
}

export const exampleKitchens: ExampleKitchen[] = [
  {
    id: 'compact-line',
    title: 'Компактная прямая',
    description: 'Линейная кухня для небольшой комнаты: всё необходимое вдоль одной стены.',
    style: 'Лофт',
    dimensions: { width: 320, depth: 240, wallHeight: 270 },
    shape: 'rectangle',
    notchWidth: 140,
    notchDepth: 110,
    items: [
      place('fridge-70', 35, 35),
      place('base-40', 90, 30),
      place('sink-80', 150, 30),
      place('base-60', 220, 30),
      place('stove-60', 280, 30)
    ]
  },
  {
    id: 'corner-l',
    title: 'Угловая Г-образная',
    description: 'Рабочий треугольник по двум стенам — удобно готовить и хранить.',
    style: 'Классика',
    dimensions: { width: 380, depth: 300, wallHeight: 270 },
    shape: 'l-shape',
    notchWidth: 150,
    notchDepth: 120,
    items: [
      place('corner-base', 45, 45),
      place('base-60', 120, 30),
      place('sink-80', 190, 30),
      place('stove-60', 260, 30),
      place('base-60', 30, 120, 90),
      place('tall-pantry', 30, 180, 90)
    ]
  },
  {
    id: 'u-classic',
    title: 'П-образная классика',
    description: 'Максимум рабочих поверхностей: гарнитур охватывает три стены.',
    style: 'Неоклассика',
    dimensions: { width: 360, depth: 300, wallHeight: 280 },
    shape: 'u-shape',
    notchWidth: 150,
    notchDepth: 110,
    items: [
      place('base-60', 60, 30, 0, 'sand'),
      place('sink-80', 150, 30, 0, 'sand'),
      place('base-60', 230, 30, 0, 'sand'),
      place('base-60', 30, 110, 90, 'sand'),
      place('stove-60', 30, 180, 90, 'sand'),
      place('base-60', 330, 110, 270, 'sand'),
      place('fridge-70', 325, 185, 270, 'sand')
    ]
  },
  {
    id: 'island-open',
    title: 'Кухня с островом',
    description: 'Просторная планировка с центральным островом для готовки и общения.',
    style: 'Современная',
    dimensions: { width: 440, depth: 360, wallHeight: 280 },
    shape: 'rectangle',
    notchWidth: 140,
    notchDepth: 110,
    items: [
      place('fridge-70', 40, 35),
      place('base-60', 100, 30),
      place('sink-80', 170, 30),
      place('base-60', 240, 30),
      place('stove-60', 310, 30),
      place('island-120', 220, 220)
    ]
  },
  {
    id: 'graphite-min',
    title: 'Минимализм графит',
    description: 'Тёмный матовый фасад без ручек — строгий монохромный характер.',
    style: 'Минимализм',
    dimensions: { width: 340, depth: 260, wallHeight: 270 },
    shape: 'rectangle',
    notchWidth: 140,
    notchDepth: 110,
    items: [
      place('tall-pantry', 40, 40, 0, 'graphite'),
      place('base-60', 110, 30, 0, 'graphite'),
      place('sink-80', 180, 30, 0, 'graphite'),
      place('stove-60', 250, 30, 0, 'graphite'),
      place('base-40', 300, 30, 0, 'graphite')
    ]
  },
  {
    id: 'parallel',
    title: 'Параллельная',
    description: 'Два ряда гарнитура напротив друг друга — для вытянутых помещений.',
    style: 'Сканди',
    dimensions: { width: 360, depth: 300, wallHeight: 270 },
    shape: 'rectangle',
    notchWidth: 140,
    notchDepth: 110,
    items: [
      place('base-60', 60, 30, 0, 'sage'),
      place('sink-80', 150, 30, 0, 'sage'),
      place('base-60', 230, 30, 0, 'sage'),
      place('fridge-70', 40, 265, 180, 'sage'),
      place('stove-60', 120, 270, 180, 'sage'),
      place('base-60', 190, 270, 180, 'sage')
    ]
  },
  {
    id: 'pantry-rich',
    title: 'Просторная с пеналами',
    description: 'Колонна высоких пеналов даёт много закрытого хранения.',
    style: 'Современная',
    dimensions: { width: 440, depth: 340, wallHeight: 290 },
    shape: 'rectangle',
    notchWidth: 140,
    notchDepth: 110,
    items: [
      place('tall-pantry', 40, 40),
      place('tall-pantry', 30, 120, 90),
      place('tall-pantry', 30, 190, 90),
      place('base-60', 120, 30),
      place('sink-80', 200, 30),
      place('stove-60', 280, 30),
      place('fridge-70', 360, 35)
    ]
  },
  {
    id: 'family-l',
    title: 'Семейная большая',
    description: 'Г-образный гарнитур и остров — комфортная зона для всей семьи.',
    style: 'Современная',
    dimensions: { width: 460, depth: 360, wallHeight: 290 },
    shape: 'l-shape',
    notchWidth: 160,
    notchDepth: 130,
    items: [
      place('corner-base', 45, 45, 0, 'sand'),
      place('base-60', 120, 30, 0, 'sand'),
      place('sink-80', 200, 30, 0, 'sand'),
      place('stove-60', 280, 30, 0, 'sand'),
      place('fridge-70', 360, 35, 0, 'sand'),
      place('base-60', 30, 120, 90, 'sand'),
      place('island-120', 200, 230, 0, 'sand')
    ]
  },
  {
    id: 'scandi-steel',
    title: 'Скандинавская',
    description: 'Светлые фасады с верхними шкафами на противоположной стене.',
    style: 'Сканди',
    dimensions: { width: 360, depth: 280, wallHeight: 270 },
    shape: 'rectangle',
    notchWidth: 140,
    notchDepth: 110,
    items: [
      place('base-60', 60, 30, 0, 'steel'),
      place('sink-80', 150, 30, 0, 'steel'),
      place('stove-60', 230, 30, 0, 'steel'),
      place('base-40', 300, 30, 0, 'steel'),
      place('wall-60', 80, 262, 180, 'steel'),
      place('wall-60', 160, 262, 180, 'steel')
    ]
  },
  {
    id: 'studio-bar',
    title: 'Студия с барной зоной',
    description: 'Остров служит барной стойкой и зонирует кухню-гостиную.',
    style: 'Лофт',
    dimensions: { width: 400, depth: 320, wallHeight: 280 },
    shape: 'rectangle',
    notchWidth: 140,
    notchDepth: 110,
    items: [
      place('fridge-70', 40, 35, 0, 'clay'),
      place('base-60', 100, 30, 0, 'clay'),
      place('sink-80', 175, 30, 0, 'clay'),
      place('stove-60', 250, 30, 0, 'clay'),
      place('base-40', 310, 30, 0, 'clay'),
      place('island-120', 200, 210, 0, 'clay')
    ]
  }
]
