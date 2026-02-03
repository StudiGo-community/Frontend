/**
 * 기존 searchParams에 특정 파라미터만 업데이트하여 새로운 URL 경로를 생성.
 * 특정 쿼리 파라미터를 삭제할 때는 null을 사용. (예: createUrl("/", { page: 1 }, { page: null }))
 * @param pathname 대상 경로 (예: '/', '/chat')
 * @param currentParams 현재 URL의 searchParams 객체
 * @param updates 업데이트할 파라미터 키-값 쌍
 * @returns 생성된 쿼리 스트링을 포함한 URL (예: "?category=free&sort=latest&page=1")
 */
export const createUrl = (
  pathname: string,
  currentParams: Record<string, string | string[] | undefined>,
  updates: Record<string, string | number | undefined | null>
) => {
  const params = new URLSearchParams()

  // 1. 기존 파라미터 복제
  Object.entries(currentParams).forEach(([key, value]) => {
    if (value === undefined) return
    if (Array.isArray(value)) {
      value.forEach((v) => params.append(key, v))
    } else {
      params.set(key, value as string)
    }
  })

  // 2. 업데이트할 파라미터 적용
  Object.entries(updates).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      params.delete(key)
    } else {
      params.set(key, value.toString())
    }
  })

  const queryString = params.toString()
  return queryString ? `?${queryString}` : pathname
}

// 그런데 nuqs를 사용하게 되면 삭제될 거에요;;

/**
 * URL의 프로토콜 및 유효성을 검사하는 함수
 * @param url 검사할 URL 문자열
 * @param defaultProtocol 기본 프로토콜 (기본값: 'https')
 * @returns 유효하면 true, 아니면 false
 */
export const validateUrl = (
  url: string,
  defaultProtocol: string = 'https',
  allowedProtocols: string[] = ['http', 'https']
) => {
  try {
    const parsedUrl = url.includes(':')
      ? new URL(url)
      : new URL(`${defaultProtocol}://${url}`)

    // 금지된 프로토콜 (XSS)
    const disallowedProtocols = ['ftp', 'file', 'mailto']
    const protocol = parsedUrl.protocol.replace(':', '')

    if (disallowedProtocols.includes(protocol)) {
      return false
    }

    // 허용된 프로토콜인지 확인
    if (!allowedProtocols.includes(protocol)) {
      return false
    }

    // 도메인 형식 검사 (최소한 하나의 점(.)을 포함하거나 localhost여야 함)
    const hostname = parsedUrl.hostname
    if (hostname !== 'localhost' && !hostname.includes('.')) {
      return false
    }

    // TLD 검사 (간단하게 2글자 이상인지 확인)
    const parts = hostname.split('.')
    if (hostname !== 'localhost' && parts[parts.length - 1].length < 2) {
      return false
    }

    return true
  } catch {
    return false
  }
}

/**
 * URL을 정규화하는 함수 (프로토콜이 없으면 추가)
 * @param url 입력 URL
 * @returns 정규화된 URL
 */
export const formatUrl = (url: string) => {
  let formattedUrl = url.trim()

  // 프로토콜이 없는 경우
  if (!formattedUrl.includes('://')) {
    // www. 으로 시작하면 유지, 아니더라도 https:// 붙임
    // 단, 아예 도메인 형식이 아닌 경우(예: 'naver')는 그대로 두거나
    // 사용자 의도에 따라 다르게 처리될 수 있으나, 여기서는 https:// 만 붙임
    // validateUrl에서 걸러질 것임.

    // 이미 www. 이 있는 경우도 https://www.naver.com 꼴로 만들기 위해
    // slice 하지 않고 바로 https:// 붙이는게 안전함 (기존 코드에서는 www. 제거함)
    // 하지만 보통 www. 입력하면 그대로 두는게 나으므로 제거 로직 삭제 혹은 유지 고민
    // 요청사항: 'naver라고 쳐도 그냥 naver/가 들어가버리고' -> 이건 validateUrl에서 막아야 함.

    // 기존 로직 수정: www. 제거 안함. https://만 붙임.
    formattedUrl = `https://${formattedUrl}`
  }
  return formattedUrl
}
