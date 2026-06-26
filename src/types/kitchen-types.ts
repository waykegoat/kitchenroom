export interface PlanPoint {
  x: number
  y: number
}

export interface RoomDimensions {
  width: number
  depth: number
  wallHeight: number
}

export type RoomShape = 'rectangle' | 'l-shape' | 'u-shape'

export interface RoomShapeParams {
  shape: RoomShape
  width: number
  depth: number
  notchWidth: number
  notchDepth: number
}

export type FurnitureCategory =
  | 'base-cabinet'
  | 'wall-cabinet'
  | 'tall-cabinet'
  | 'appliance'
  | 'sink'
  | 'island'

export interface FurnitureBlueprint {
  id: string
  title: string
  category: FurnitureCategory
  width: number
  depth: number
  height: number
  color: string
  icon: string
  price: number
}

export interface MaterialFinish {
  id: string
  title: string
  color: string
  priceFactor: number
}

export interface PlacedFurniture {
  uid: string
  blueprintId: string
  title: string
  category: FurnitureCategory
  position: PlanPoint
  width: number
  depth: number
  height: number
  rotation: number
  color: string
  materialId: string
  basePrice: number
}

export type ConstructorViewMode = 'plan' | 'perspective'

export interface RoomState {
  dimensions: RoomDimensions
  wallThickness: number
  floorColor: string
  wallColor: string
}

export interface ExampleKitchen {
  id: string
  title: string
  description: string
  style: string
  dimensions: RoomDimensions
  shape: RoomShape
  notchWidth: number
  notchDepth: number
  items: PlacedFurniture[]
}

export interface ProjectSnapshot {
  id: string
  name: string
  createdAt: number
  updatedAt: number
  dimensions: RoomDimensions
  shape?: RoomShape
  notchWidth?: number
  notchDepth?: number
  items: PlacedFurniture[]
}
