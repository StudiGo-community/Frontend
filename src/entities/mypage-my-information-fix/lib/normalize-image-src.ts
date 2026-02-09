function isAbsoluteHttpUrl(value: string): boolean {
  return /^https?:\/\//.test(value)
}

export function normalizeImageSrcForNextImage(src: string): string {
  if (!src) return src

  if (!isAbsoluteHttpUrl(src)) return src

  if (typeof window === 'undefined') return src

  const origin = window.location.origin

  if (src.startsWith(origin)) {
    const relative = src.slice(origin.length)
    return relative.length > 0 ? relative : '/'
  }

  return src
}

export function isExternalToCurrentOrigin(src: string): boolean {
  if (!src) return false
  if (!/^https?:\/\//.test(src)) return false
  if (typeof window === 'undefined') return true
  return !src.startsWith(window.location.origin)
}
