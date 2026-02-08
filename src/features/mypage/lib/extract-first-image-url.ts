function findImgSrcFromHtml(html: string): string {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return match?.[1] ?? ''
}

function findImgSrcFromMarkdown(md: string): string {
  const match = md.match(/!\[[^\]]*\]\(([^)]+)\)/)
  return match?.[1] ?? ''
}

function walkJson(node: unknown): string {
  if (!node || typeof node !== 'object') return ''

  const n = node as Record<string, unknown>

  const type = n.type
  if (typeof type === 'string' && type.toLowerCase().includes('image')) {
    const attrs = n.attrs
    if (attrs && typeof attrs === 'object') {
      const a = attrs as Record<string, unknown>
      const candidate =
        a.src ?? a.url ?? a.imageUrl ?? a.href ?? a.originalSrc ?? ''
      return typeof candidate === 'string' ? candidate : ''
    }
    return ''
  }

  const content = n.content
  if (Array.isArray(content)) {
    for (const child of content) {
      const found = walkJson(child)
      if (found) return found
    }
  }

  return ''
}

export function extractFirstImageUrl(contentPreview: unknown): string {
  if (typeof contentPreview !== 'string') return ''
  const raw = contentPreview.trim()
  if (!raw) return ''

  if (raw.includes('<img')) {
    const src = findImgSrcFromHtml(raw)
    if (src) return src
  }

  if (raw.includes('![') && raw.includes('](')) {
    const src = findImgSrcFromMarkdown(raw)
    if (src) return src
  }

  try {
    const doc = JSON.parse(raw)
    return walkJson(doc)
  } catch {
    return ''
  }
}
