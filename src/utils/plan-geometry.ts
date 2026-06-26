import type { PlacedFurniture, PlanPoint, RoomDimensions } from '@/types/kitchen-types'
import { tierOf } from './furniture-tier'

export interface PlanBounds {
  minX: number
  minY: number
  maxX: number
  maxY: number
}

const GRID_SNAP = 5
const WALL_SNAP_THRESHOLD = 14
const NEIGHBOR_SNAP_THRESHOLD = 11

export function footprintFor(item: Pick<PlacedFurniture, 'width' | 'depth' | 'rotation'>): {
  halfWidth: number
  halfDepth: number
} {
  const rotated = item.rotation === 90 || item.rotation === 270
  const effectiveWidth = rotated ? item.depth : item.width
  const effectiveDepth = rotated ? item.width : item.depth
  return { halfWidth: effectiveWidth / 2, halfDepth: effectiveDepth / 2 }
}

export function boundsAt(
  item: Pick<PlacedFurniture, 'width' | 'depth' | 'rotation'>,
  position: PlanPoint
): PlanBounds {
  const { halfWidth, halfDepth } = footprintFor(item)
  return {
    minX: position.x - halfWidth,
    minY: position.y - halfDepth,
    maxX: position.x + halfWidth,
    maxY: position.y + halfDepth
  }
}

export function clampToRoom(
  item: Pick<PlacedFurniture, 'width' | 'depth' | 'rotation'>,
  position: PlanPoint,
  room: RoomDimensions
): PlanPoint {
  const { halfWidth, halfDepth } = footprintFor(item)
  return {
    x: Math.min(room.width - halfWidth, Math.max(halfWidth, position.x)),
    y: Math.min(room.depth - halfDepth, Math.max(halfDepth, position.y))
  }
}

function snapToGrid(value: number): number {
  return Math.round(value / GRID_SNAP) * GRID_SNAP
}

function rangesNear(aMin: number, aMax: number, bMin: number, bMax: number, margin: number): boolean {
  return aMin < bMax + margin && aMax > bMin - margin
}

function nearestSnap(current: number, candidates: number[], threshold: number): number {
  let best = current
  let bestDelta = threshold
  for (const candidate of candidates) {
    const delta = Math.abs(candidate - current)
    if (delta < bestDelta) {
      bestDelta = delta
      best = candidate
    }
  }
  return best
}

function snapToNeighbors(
  half: { halfWidth: number; halfDepth: number },
  position: PlanPoint,
  neighbors: PlacedFurniture[]
): PlanPoint {
  const left = position.x - half.halfWidth
  const right = position.x + half.halfWidth
  const top = position.y - half.halfDepth
  const bottom = position.y + half.halfDepth

  const xCandidates: number[] = []
  const yCandidates: number[] = []

  for (const neighbor of neighbors) {
    const bounds = boundsAt(neighbor, neighbor.position)
    if (rangesNear(top, bottom, bounds.minY, bounds.maxY, NEIGHBOR_SNAP_THRESHOLD)) {
      xCandidates.push(bounds.maxX + half.halfWidth, bounds.minX - half.halfWidth)
      xCandidates.push(bounds.minX + half.halfWidth, bounds.maxX - half.halfWidth)
    }
    if (rangesNear(left, right, bounds.minX, bounds.maxX, NEIGHBOR_SNAP_THRESHOLD)) {
      yCandidates.push(bounds.maxY + half.halfDepth, bounds.minY - half.halfDepth)
      yCandidates.push(bounds.minY + half.halfDepth, bounds.maxY - half.halfDepth)
    }
  }

  return {
    x: nearestSnap(position.x, xCandidates, NEIGHBOR_SNAP_THRESHOLD),
    y: nearestSnap(position.y, yCandidates, NEIGHBOR_SNAP_THRESHOLD)
  }
}

export function snapPosition(
  item: Pick<PlacedFurniture, 'width' | 'depth' | 'rotation'>,
  rawPosition: PlanPoint,
  room: RoomDimensions,
  neighbors: PlacedFurniture[] = []
): PlanPoint {
  const half = footprintFor(item)
  let x = snapToGrid(rawPosition.x)
  let y = snapToGrid(rawPosition.y)

  if (Math.abs(rawPosition.x - half.halfWidth) < WALL_SNAP_THRESHOLD) x = half.halfWidth
  if (Math.abs(room.width - half.halfWidth - rawPosition.x) < WALL_SNAP_THRESHOLD) {
    x = room.width - half.halfWidth
  }
  if (Math.abs(rawPosition.y - half.halfDepth) < WALL_SNAP_THRESHOLD) y = half.halfDepth
  if (Math.abs(room.depth - half.halfDepth - rawPosition.y) < WALL_SNAP_THRESHOLD) {
    y = room.depth - half.halfDepth
  }

  const snapped = neighbors.length ? snapToNeighbors(half, { x, y }, neighbors) : { x, y }
  return clampToRoom(item, snapped, room)
}

function overlaps(a: PlanBounds, b: PlanBounds): boolean {
  return a.minX < b.maxX && a.maxX > b.minX && a.minY < b.maxY && a.maxY > b.minY
}

export function collidingUids(items: PlacedFurniture[]): Set<string> {
  const result = new Set<string>()
  for (let i = 0; i < items.length; i += 1) {
    for (let j = i + 1; j < items.length; j += 1) {
      const first = items[i]
      const second = items[j]
      if (tierOf(first.category) !== tierOf(second.category)) continue
      if (overlaps(boundsAt(first, first.position), boundsAt(second, second.position))) {
        result.add(first.uid)
        result.add(second.uid)
      }
    }
  }
  return result
}

export function centerOfRoom(room: RoomDimensions): PlanPoint {
  return { x: room.width / 2, y: room.depth / 2 }
}
