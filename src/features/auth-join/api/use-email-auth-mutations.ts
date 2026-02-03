'use client'

import { useMutation } from '@tanstack/react-query'
import {
  checkEmail,
  sendEmailCode,
  verifyEmailCode,
} from '@/features/auth-join/api/email-auth-api'
import { AUTH_JOIN_QUERY_KEYS } from '@/features/auth-join/api/query-keys'

export interface SendEmailCodePayload {
  email: string
  check_token: string
}

export interface VerifyEmailCodePayload {
  email: string
  request_id: string
  verification_code: string
}

export const useCheckEmailMutation = (email: string) => {
  return useMutation({
    mutationKey: AUTH_JOIN_QUERY_KEYS.emailCheck(email),
    mutationFn: () => checkEmail(email),
  })
}

export const useSendEmailCodeMutation = () => {
  return useMutation({
    mutationKey: AUTH_JOIN_QUERY_KEYS.emailSendCode(''),
    mutationFn: (payload: SendEmailCodePayload) => sendEmailCode(payload),
  })
}

export const useVerifyEmailCodeMutation = () => {
  return useMutation({
    mutationKey: AUTH_JOIN_QUERY_KEYS.emailVerifyCode(''),
    mutationFn: (payload: VerifyEmailCodePayload) => verifyEmailCode(payload),
  })
}
