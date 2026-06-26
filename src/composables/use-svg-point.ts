import type { Ref } from 'vue'
import type { PlanPoint } from '@/types/kitchen-types'

export function useSvgPoint(svgRef: Ref<SVGSVGElement | null>) {
  function toPlanPoint(clientX: number, clientY: number): PlanPoint | null {
    const svg = svgRef.value
    if (!svg) return null

    const matrix = svg.getScreenCTM()
    if (!matrix) return null

    const point = svg.createSVGPoint()
    point.x = clientX
    point.y = clientY
    const local = point.matrixTransform(matrix.inverse())
    return { x: local.x, y: local.y }
  }

  return { toPlanPoint }
}
