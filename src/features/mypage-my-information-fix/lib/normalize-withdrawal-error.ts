import axios from 'axios'
import { WithdrawalErrorResponseSchema } from '@/entities/mypage-my-information-fix/model/withdrawal-schema'

export function normalizeWithdrawalError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const parsed = WithdrawalErrorResponseSchema.safeParse(error.response?.data)
    if (parsed.success) return parsed.data.detail
  }

  return '회원탈퇴에 실패했습니다. 다시 시도해주세요.'
}
