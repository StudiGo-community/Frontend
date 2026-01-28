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
