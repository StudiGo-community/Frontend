export interface NicknameCheckRequest {
  nickname: string
}

export interface NicknameCheckResponse {
  message: string
  check_token: string
  expires_in: number
}

type ApiErrorBody = {
  detail?: string
  error_detail?: string
}

function buildUrl(pathWithApiV1: string) {
  const base = (process.env.NEXT_PUBLIC_API_BASE_URL ?? '').replace(/\/+$/, '')
  const normalizedPath = base.endsWith('/api/v1')
    ? pathWithApiV1.replace(/^\/api\/v1/, '')
    : pathWithApiV1
  return `${base}${normalizedPath}`
}

export async function checkNickname(
  nickname: string
): Promise<NicknameCheckResponse> {
  const url = buildUrl('/api/v1/auth/check-nickname')

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ nickname } satisfies NicknameCheckRequest),
  })

  if (!res.ok) {
    let msg = '닉네임 중복 확인 실패'
    try {
      const data = (await res.json()) as ApiErrorBody
      msg = data.detail ?? data.error_detail ?? msg
    } catch {}
    throw new Error(msg)
  }

  return (await res.json()) as NicknameCheckResponse
}
