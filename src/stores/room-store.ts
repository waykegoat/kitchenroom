import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { RoomDimensions, RoomShape } from '@/types/kitchen-types'
import { buildOutline, polygonArea } from '@/utils/room-outline'

const MIN_SIDE = 150
const MAX_SIDE = 1000

export const useRoomStore = defineStore('room', () => {
  const dimensions = ref<RoomDimensions>({
    width: 400,
    depth: 320,
    wallHeight: 270
  })
  const shape = ref<RoomShape>('rectangle')
  const notchWidth = ref(160)
  const notchDepth = ref(120)
  const wallThickness = ref(12)
  const floorColor = ref('#e9e2d6')
  const wallColor = ref('#d8d6cf')

  const outline = computed(() =>
    buildOutline({
      shape: shape.value,
      width: dimensions.value.width,
      depth: dimensions.value.depth,
      notchWidth: notchWidth.value,
      notchDepth: notchDepth.value
    })
  )

  const areaSquareMeters = computed(() => polygonArea(outline.value) / 10000)

  function clamp(value: number): number {
    if (Number.isNaN(value)) return MIN_SIDE
    return Math.min(MAX_SIDE, Math.max(MIN_SIDE, Math.round(value)))
  }

  function clampNotch(value: number, limit: number): number {
    if (Number.isNaN(value)) return 40
    return Math.min(limit - 40, Math.max(40, Math.round(value)))
  }

  function setWidth(value: number): void {
    dimensions.value.width = clamp(value)
    notchWidth.value = clampNotch(notchWidth.value, dimensions.value.width)
  }

  function setDepth(value: number): void {
    dimensions.value.depth = clamp(value)
    notchDepth.value = clampNotch(notchDepth.value, dimensions.value.depth)
  }

  function setWallHeight(value: number): void {
    dimensions.value.wallHeight = Math.min(400, Math.max(200, Math.round(value)))
  }

  function setShape(value: RoomShape): void {
    shape.value = value
  }

  function setNotchWidth(value: number): void {
    notchWidth.value = clampNotch(value, dimensions.value.width)
  }

  function setNotchDepth(value: number): void {
    notchDepth.value = clampNotch(value, dimensions.value.depth)
  }

  return {
    dimensions,
    shape,
    notchWidth,
    notchDepth,
    wallThickness,
    floorColor,
    wallColor,
    outline,
    areaSquareMeters,
    setWidth,
    setDepth,
    setWallHeight,
    setShape,
    setNotchWidth,
    setNotchDepth
  }
})
