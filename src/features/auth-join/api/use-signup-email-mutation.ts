'use client'

import { useMutation } from '@tanstack/react-query'
import {
  signupEmail,
  type SignupEmailRequest,
} from '@/features/auth-join/api/signup-api'
import { AUTH_JOIN_QUERY_KEYS } from '@/features/auth-join/api/query-keys'

export const useSignupEmailMutation = () => {
  return useMutation({
    mutationKey: AUTH_JOIN_QUERY_KEYS.signupEmail(),
    mutationFn: (payload: SignupEmailRequest) => signupEmail(payload),
  })
}
