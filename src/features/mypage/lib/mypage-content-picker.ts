import { extractFirstImageUrl } from '@/features/mypage/lib/extract-first-image-url'

export const DEFAULT_AVATAR = '/images/profiles/default-1.webp'

function pickString(obj: unknown, key: string): string | undefined {
  if (!obj || typeof obj !== 'object') return undefined
  const rec = obj as Record<string, unknown>
  const value = rec[key]
  return typeof value === 'string' ? value : undefined
}

function pickFirstString(obj: unknown, keys: string[]): string {
  for (const k of keys) {
    const v = pickString(obj, k)
    if (v) return v
  }
  return ''
}

export function pickContentPreview(obj: unknown): string {
  return pickFirstString(obj, ['contentPreview', 'content_preview'])
}

function pickDetailContent(detail: unknown): string {
  return pickFirstString(detail, [
    'content',
    'content_preview',
    'contentPreview',
  ])
}

export function pickDetailThumbnail(detail: unknown): string {
  if (!detail || typeof detail !== 'object') return ''
  const rec = detail as Record<string, unknown>

  const thumb = rec['thumbnail_url']
  if (typeof thumb === 'string' && thumb.trim()) return thumb

  const images = rec['images']
  if (Array.isArray(images) && images.length > 0) {
    const first = images[0]
    if (typeof first === 'string' && first.trim()) return first
    if (first && typeof first === 'object') {
      const f = first as Record<string, unknown>
      const url =
        (typeof f['url'] === 'string' && f['url']) ||
        (typeof f['src'] === 'string' && f['src']) ||
        (typeof f['image_url'] === 'string' && f['image_url']) ||
        ''
      if (url) return url
    }
  }

  const content = pickDetailContent(detail)
  return extractFirstImageUrl(content)
}
