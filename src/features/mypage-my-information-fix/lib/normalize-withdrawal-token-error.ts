import axios from 'axios'
import { WithdrawalTokenErrorResponseSchema } from '@/entities/mypage-my-information-fix/model/withdrawal-token-schema'

export function normalizeWithdrawalTokenError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const parsed = WithdrawalTokenErrorResponseSchema.safeParse(
      error.response?.data
    )
    if (parsed.success) return parsed.data.detail
  }
  return '회원탈퇴 인증 처리에 실패했습니다.'
}
