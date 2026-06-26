const INLINE_PROPERTIES = [
  'fill',
  'stroke',
  'stroke-width',
  'stroke-dasharray',
  'stroke-linecap',
  'stroke-linejoin',
  'opacity',
  'font-size',
  'font-weight',
  'font-family',
  'text-anchor'
]

function inlineStyles(source: SVGSVGElement, clone: SVGSVGElement): void {
  const sourceNodes = source.querySelectorAll<SVGElement>('*')
  const cloneNodes = clone.querySelectorAll<SVGElement>('*')
  sourceNodes.forEach((node, index) => {
    const target = cloneNodes[index]
    if (!target) return
    const computed = window.getComputedStyle(node)
    const declarations = INLINE_PROPERTIES.map(
      (property) => `${property}:${computed.getPropertyValue(property)}`
    )
    target.setAttribute('style', declarations.join(';'))
  })
}

function triggerDownload(url: string, filename: string): void {
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
}

export function usePlanExport() {
  function findPlanSvg(): SVGSVGElement | null {
    return document.querySelector<SVGSVGElement>('.constructor-canvas__svg')
  }

  async function exportPlanPng(filename: string): Promise<void> {
    const svg = findPlanSvg()
    if (!svg) return

    const box = svg.viewBox.baseVal
    const scale = 2
    const clone = svg.cloneNode(true) as SVGSVGElement
    inlineStyles(svg, clone)
    clone.style.transform = 'none'
    clone.setAttribute('width', String(box.width))
    clone.setAttribute('height', String(box.height))
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

    const serialized = new XMLSerializer().serializeToString(clone)
    const svgUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(serialized)}`

    const image = new Image()
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve()
      image.onerror = () => reject(new Error('svg load failed'))
      image.src = svgUrl
    })

    const canvas = document.createElement('canvas')
    canvas.width = box.width * scale
    canvas.height = box.height * scale
    const context = canvas.getContext('2d')
    if (!context) return
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    context.drawImage(image, 0, 0, canvas.width, canvas.height)

    triggerDownload(canvas.toDataURL('image/png'), filename)
  }

  function exportPlanPdf(): void {
    window.print()
  }

  return { exportPlanPng, exportPlanPdf }
}
