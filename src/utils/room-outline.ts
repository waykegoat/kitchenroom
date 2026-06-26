import type { PlanPoint, RoomShapeParams } from '@/types/kitchen-types'

export function buildOutline(params: RoomShapeParams): PlanPoint[] {
  const { shape, width: w, depth: d } = params
  const nw = Math.min(params.notchWidth, w - 20)
  const nd = Math.min(params.notchDepth, d - 20)

  if (shape === 'l-shape') {
    return [
      { x: 0, y: 0 },
      { x: w, y: 0 },
      { x: w, y: d - nd },
      { x: w - nw, y: d - nd },
      { x: w - nw, y: d },
      { x: 0, y: d }
    ]
  }

  if (shape === 'u-shape') {
    const gapLeft = (w - nw) / 2
    const gapRight = (w + nw) / 2
    return [
      { x: 0, y: 0 },
      { x: w, y: 0 },
      { x: w, y: d },
      { x: gapRight, y: d },
      { x: gapRight, y: d - nd },
      { x: gapLeft, y: d - nd },
      { x: gapLeft, y: d },
      { x: 0, y: d }
    ]
  }

  return [
    { x: 0, y: 0 },
    { x: w, y: 0 },
    { x: w, y: d },
    { x: 0, y: d }
  ]
}

export function polygonArea(points: PlanPoint[]): number {
  let sum = 0
  for (let i = 0; i < points.length; i += 1) {
    const current = points[i]
    const next = points[(i + 1) % points.length]
    sum += current.x * next.y - next.x * current.y
  }
  return Math.abs(sum) / 2
}

export function polygonCentroid(points: PlanPoint[]): PlanPoint {
  const total = points.reduce(
    (acc, point) => ({ x: acc.x + point.x, y: acc.y + point.y }),
    { x: 0, y: 0 }
  )
  return { x: total.x / points.length, y: total.y / points.length }
}

export function pointInPolygon(point: PlanPoint, polygon: PlanPoint[]): boolean {
  let inside = false
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i, i += 1) {
    const a = polygon[i]
    const b = polygon[j]
    const intersects =
      a.y > point.y !== b.y > point.y &&
      point.x < ((b.x - a.x) * (point.y - a.y)) / (b.y - a.y) + a.x
    if (intersects) inside = !inside
  }
  return inside
}

export function pointsToPath(points: PlanPoint[]): string {
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`).join(' ') + ' Z'
}
