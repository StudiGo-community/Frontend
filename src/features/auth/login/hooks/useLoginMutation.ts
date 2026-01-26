import { useRouter, useSearchParams } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import { AxiosError } from 'axios'

import { useTokenStore } from '@/features/auth'
import { postEmailLogin } from '@/features/auth/api/endpoints/login'
import {
  EmailLoginRequest,
  EmailLoginResponse,
  LoginInvalidCredentialsErrorSchema,
  LoginAccountWithdrawnErrorSchema,
  LoginBlockedErrorSchema,
} from '@/features/auth/api/schemas/login'

export function useLoginMutation() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next')

  return useMutation<EmailLoginResponse, AxiosError, EmailLoginRequest>({
    mutationFn: postEmailLogin,
    onSuccess: (response) => {
      if (response.accessToken) {
        useTokenStore.getState().setAccessToken(response.accessToken)
      }
      toast.success(`${response.user.nickname}님, 환영합니다!`)
      const redirectPath = next ? decodeURIComponent(next) : '/'
      router.replace(redirectPath)
      router.refresh()
    },
    onError: (error) => {
      const errorData = error.response?.data
      const invalid = LoginInvalidCredentialsErrorSchema.safeParse(errorData)
      if (invalid.success) return toast.error(invalid.data.detail)
      const blocked = LoginBlockedErrorSchema.safeParse(errorData)
      if (blocked.success)
        return toast.error(
          `${blocked.data.error_detail} (대기: ${blocked.data.retry_after}초)`
        )
      const withdrawn = LoginAccountWithdrawnErrorSchema.safeParse(errorData)
      if (withdrawn.success)
        return toast.error(`${withdrawn.data.error_detail}`)
      toast.error('로그인 정보가 일치하지 않거나 오류가 발생했습니다.')
    },
  })
}
