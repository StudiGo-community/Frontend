import { useQuery } from '@tanstack/react-query'
import { getWithdrawalTokenStepApi } from '@/entities/mypage-my-information-fix/api/withdrawal-token-api'

export function useWithdrawalTokenStep(enabled: boolean) {
  return useQuery({
    queryKey: ['auth', 'withdrawal-token-step'],
    queryFn: getWithdrawalTokenStepApi,
    enabled,
    staleTime: 0,
    gcTime: 0,
  })
}
