import { toast } from 'sonner'

interface CopyToClipboardOptions {
  successMessage?: string
  errorMessage?: string
}

/**
 * 텍스트를 클립보드에 복사하고 토스트 알림을 표시합니다.
 * @note 이 함수는 브라우저 환경(Client Side)에서만 동작합니다. (navigator.clipboard 사용)
 */
export async function copyToClipboard(
  text: string,
  options: CopyToClipboardOptions = {}
): Promise<boolean> {
  const {
    successMessage = '클립보드에 복사되었습니다.',
    errorMessage = '클립보드 복사에 실패했습니다.',
  } = options

  if (typeof navigator === 'undefined' || !navigator.clipboard) {
    toast.error('이 브라우저에서는 클립보드 기능을 사용할 수 없습니다.')
    console.warn('Clipboard API not supported')
    return false
  }

  try {
    await navigator.clipboard.writeText(text)
    if (successMessage) toast.success(successMessage)
    return true
  } catch (error) {
    console.warn('클립보드 복사 실패', error)
    if (errorMessage) toast.error(errorMessage)
    return false
  }
}
