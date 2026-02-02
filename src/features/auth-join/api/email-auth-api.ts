import { api } from '@/shared/api/client'

export interface CheckEmailResponse {
  message: string
  check_token: string
  expires_in: number
}

export interface SendEmailCodeResponse {
  request_id: string
  expires_in: number
  cooldown: number
}

export interface VerifyEmailCodeResponse {
  email_verify_token: string
  expires_in: number
}

export async function checkEmail(email: string) {
  const res = await api.post<CheckEmailResponse>('/auth/check-email', { email })
  return res.data
}

export async function sendEmailCode(params: {
  email: string
  check_token: string
}) {
  const res = await api.post<SendEmailCodeResponse>(
    '/auth/email-verification/signup/send-code',
    params
  )
  return res.data
}

export async function verifyEmailCode(params: {
  email: string
  request_id: string
  verification_code: string
}) {
  const res = await api.post<VerifyEmailCodeResponse>(
    '/auth/email-verification/signup/confirm-code',
    params
  )
  return res.data
}
