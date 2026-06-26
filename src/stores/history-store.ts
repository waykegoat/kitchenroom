import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { PlacedFurniture, RoomDimensions, RoomShape } from '@/types/kitchen-types'
import { useRoomStore } from './room-store'
import { useFurnitureStore } from './furniture-store'

interface EditorSnapshot {
  dimensions: RoomDimensions
  shape: RoomShape
  notchWidth: number
  notchDepth: number
  items: PlacedFurniture[]
}

const CAPACITY = 60
const DEBOUNCE_MS = 350

export const useHistoryStore = defineStore('history', () => {
  const roomStore = useRoomStore()
  const furnitureStore = useFurnitureStore()

  const past = ref<EditorSnapshot[]>([])
  const future = ref<EditorSnapshot[]>([])

  const canUndo = computed(() => past.value.length > 0)
  const canRedo = computed(() => future.value.length > 0)

  function capture(): EditorSnapshot {
    return {
      dimensions: { ...roomStore.dimensions },
      shape: roomStore.shape,
      notchWidth: roomStore.notchWidth,
      notchDepth: roomStore.notchDepth,
      items: furnitureStore.items.map((item) => ({ ...item, position: { ...item.position } }))
    }
  }

  function serialize(snapshot: EditorSnapshot): string {
    return JSON.stringify(snapshot)
  }

  function apply(snapshot: EditorSnapshot): void {
    roomStore.setShape(snapshot.shape)
    roomStore.setWidth(snapshot.dimensions.width)
    roomStore.setDepth(snapshot.dimensions.depth)
    roomStore.setWallHeight(snapshot.dimensions.wallHeight)
    roomStore.setNotchWidth(snapshot.notchWidth)
    roomStore.setNotchDepth(snapshot.notchDepth)
    furnitureStore.replaceAll(snapshot.items)
  }

  let last = capture()
  let timer: number | undefined

  watch(
    () => [
      furnitureStore.items,
      roomStore.dimensions,
      roomStore.shape,
      roomStore.notchWidth,
      roomStore.notchDepth
    ],
    () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(() => {
        const current = capture()
        if (serialize(current) === serialize(last)) return
        past.value.push(last)
        if (past.value.length > CAPACITY) past.value.shift()
        future.value = []
        last = current
      }, DEBOUNCE_MS)
    },
    { deep: true }
  )

  function undo(): void {
    const previous = past.value.pop()
    if (!previous) return
    future.value.push(last)
    apply(previous)
    last = previous
  }

  function redo(): void {
    const next = future.value.pop()
    if (!next) return
    past.value.push(last)
    apply(next)
    last = next
  }

  function reset(): void {
    past.value = []
    future.value = []
    last = capture()
  }

  return { canUndo, canRedo, undo, redo, reset }
})
