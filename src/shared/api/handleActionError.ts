import { isAxiosError } from 'axios'

export const handleActionError = (
  error: unknown,
  defaultMessage: string = '요청 처리에 실패했습니다.'
): never => {
  console.error(
    '\n--------------------------[Server Action Error]--------------------------'
  )
  console.error(error)
  console.error(
    '-------------------------------------------------------------------------\n'
  )

  if (isAxiosError(error)) {
    const status = error.response?.status

    if (status === 401) {
      throw new Error('로그인이 필요하거나 만료되었습니다.')
    }

    const errorMessage =
      error.response?.data?.message || error.message || defaultMessage
    throw new Error(errorMessage)
  }

  if (error instanceof Error) {
    throw error
  }

  throw new Error('알 수 없는 에러가 발생했습니다.')
}
