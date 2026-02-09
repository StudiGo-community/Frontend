export function getHttpStatusFromUnknownError(error: unknown): number | null {
  if (!error || typeof error !== 'object') return null
  const record = error as Record<string, unknown>

  const response = record['response']
  if (!response || typeof response !== 'object') return null

  const responseRecord = response as Record<string, unknown>
  const status = responseRecord['status']
  return typeof status === 'number' ? status : null
}

export function getApiErrorMessageFromUnknownError(
  error: unknown
): string | null {
  if (!error || typeof error !== 'object') return null
  const errorRecord = error as Record<string, unknown>

  const response = errorRecord['response']
  if (!response || typeof response !== 'object') return null

  const responseRecord = response as Record<string, unknown>
  const data = responseRecord['data']
  if (!data || typeof data !== 'object') return null

  const dataRecord = data as Record<string, unknown>

  const backendErrorMessage = dataRecord['error']
  if (
    typeof backendErrorMessage === 'string' &&
    backendErrorMessage.length > 0
  ) {
    return backendErrorMessage
  }

  const backendMessage = dataRecord['message']
  if (typeof backendMessage === 'string' && backendMessage.length > 0) {
    return backendMessage
  }

  const backendDetail = dataRecord['detail']
  if (typeof backendDetail === 'string' && backendDetail.length > 0) {
    return backendDetail
  }

  for (const value of Object.values(dataRecord)) {
    if (
      Array.isArray(value) &&
      value.every((item) => typeof item === 'string')
    ) {
      const joined = value.join('\n').trim()
      if (joined.length > 0) return joined
    }
  }

  return null
}

export function normalizePasswordErrorMessage(
  backendMessage: string | null
): string {
  if (!backendMessage) return '현재 비밀번호가 일치하지 않습니다'

  const normalized = backendMessage.trim()

  if (normalized.includes('소셜')) {
    return '소셜 로그인 계정은 비밀번호를 사용하지 않습니다'
  }

  if (normalized.includes('동일') && normalized.includes('비밀번호')) {
    return '현재 비밀번호와 동일합니다'
  }

  if (
    normalized.includes('현재 비밀번호') ||
    normalized.includes('기존 비밀번호') ||
    normalized.includes('올바르지') ||
    normalized.includes('틀')
  ) {
    return '현재 비밀번호가 일치하지 않습니다'
  }

  return normalized
}
