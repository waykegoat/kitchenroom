import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { FurnitureBlueprint, PlacedFurniture, PlanPoint } from '@/types/kitchen-types'
import { collidingUids } from '@/utils/plan-geometry'
import { defaultFinishId, findFinish } from '@/data/material-finishes'

let uidCounter = 0

function createUid(): string {
  uidCounter += 1
  return `furniture-${Date.now()}-${uidCounter}`
}

export const useFurnitureStore = defineStore('furniture', () => {
  const items = ref<PlacedFurniture[]>([])
  const selectedUid = ref<string | null>(null)

  const selectedItem = computed(
    () => items.value.find((item) => item.uid === selectedUid.value) ?? null
  )

  const collisions = computed(() => collidingUids(items.value))

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => {
      const factor = findFinish(item.materialId).priceFactor
      return sum + Math.round(item.basePrice * factor)
    }, 0)
  )

  function findItem(uid: string): PlacedFurniture | undefined {
    return items.value.find((item) => item.uid === uid)
  }

  function addFromBlueprint(blueprint: FurnitureBlueprint, position: PlanPoint): string {
    const placed: PlacedFurniture = {
      uid: createUid(),
      blueprintId: blueprint.id,
      title: blueprint.title,
      category: blueprint.category,
      position,
      width: blueprint.width,
      depth: blueprint.depth,
      height: blueprint.height,
      rotation: 0,
      color: blueprint.color,
      materialId: defaultFinishId,
      basePrice: blueprint.price
    }
    items.value.push(placed)
    selectedUid.value = placed.uid
    return placed.uid
  }

  function select(uid: string | null): void {
    selectedUid.value = uid
  }

  function moveTo(uid: string, position: PlanPoint): void {
    const item = findItem(uid)
    if (item) item.position = position
  }

  function rotateSelected(step = 90): void {
    const item = selectedItem.value
    if (item) item.rotation = (item.rotation + step) % 360
  }

  function resizeSelected(size: Partial<Pick<PlacedFurniture, 'width' | 'depth'>>): void {
    const item = selectedItem.value
    if (!item) return
    if (size.width !== undefined) item.width = clampSide(size.width)
    if (size.depth !== undefined) item.depth = clampSide(size.depth)
  }

  function setSelectedMaterial(materialId: string): void {
    const item = selectedItem.value
    if (!item) return
    item.materialId = materialId
    item.color = findFinish(materialId).color
  }

  function moveLayer(direction: 'forward' | 'backward' | 'front' | 'back'): void {
    const index = items.value.findIndex((item) => item.uid === selectedUid.value)
    if (index < 0) return
    const [item] = items.value.splice(index, 1)
    if (direction === 'forward') {
      items.value.splice(Math.min(items.value.length, index + 1), 0, item)
    } else if (direction === 'backward') {
      items.value.splice(Math.max(0, index - 1), 0, item)
    } else if (direction === 'front') {
      items.value.push(item)
    } else {
      items.value.unshift(item)
    }
  }

  function duplicateSelected(): void {
    const item = selectedItem.value
    if (!item) return
    const copy: PlacedFurniture = {
      ...item,
      uid: createUid(),
      position: { x: item.position.x + 20, y: item.position.y + 20 }
    }
    items.value.push(copy)
    selectedUid.value = copy.uid
  }

  function removeSelected(): void {
    if (!selectedUid.value) return
    items.value = items.value.filter((item) => item.uid !== selectedUid.value)
    selectedUid.value = null
  }

  function clearAll(): void {
    items.value = []
    selectedUid.value = null
  }

  function replaceAll(next: PlacedFurniture[]): void {
    items.value = next.map((item) => ({ ...item, position: { ...item.position } }))
    selectedUid.value = null
  }

  function clampSide(value: number): number {
    if (Number.isNaN(value)) return 20
    return Math.min(300, Math.max(20, Math.round(value)))
  }

  return {
    items,
    selectedUid,
    selectedItem,
    collisions,
    totalPrice,
    addFromBlueprint,
    select,
    moveTo,
    rotateSelected,
    resizeSelected,
    setSelectedMaterial,
    moveLayer,
    duplicateSelected,
    removeSelected,
    clearAll,
    replaceAll
  }
})
