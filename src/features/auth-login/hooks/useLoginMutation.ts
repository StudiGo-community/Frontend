import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import {
  EmailLoginRequest,
  EmailLoginResponse,
} from '@/features/auth-login/model/login-schema'
import { postEmailLogin } from '@/features/auth-login/api/login'

export interface UseLoginMutationProps {
  onSuccess?: (response: EmailLoginResponse) => void
  onError?: (error: AxiosError) => void
}

export function useLoginMutation({
  onSuccess,
  onError,
}: UseLoginMutationProps = {}) {
  return useMutation<EmailLoginResponse, AxiosError, EmailLoginRequest>({
    mutationFn: postEmailLogin,

    onSuccess: (response) => {
      onSuccess?.(response)
    },

    onError: (error) => {
      onError?.(error)
    },
  })
}
