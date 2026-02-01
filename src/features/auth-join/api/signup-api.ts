import type { AxiosInstance } from 'axios'
import {
  CheckEmailRequest,
  CheckEmailRequestSchema,
  CheckEmailResponse,
  CheckEmailResponseSchema,
} from '@/features/auth-join/model/check-email-schema'
import {
  SendEmailCodeRequest,
  SendEmailCodeRequestSchema,
  SendEmailCodeResponse,
  SendEmailCodeResponseSchema,
} from '@/features/auth-join/model/send-email-code-schema'
import {
  VerifyEmailCodeRequest,
  VerifyEmailCodeRequestSchema,
  VerifyEmailCodeResponse,
  VerifyEmailCodeResponseSchema,
} from '@/features/auth-join/model/verify-email-code-schema'
import {
  NicknameCheckRequest,
  NicknameCheckRequestSchema,
  NicknameCheckResponse,
  NicknameCheckResponseSchema,
} from '@/features/auth-join/model/nickname-schema'
import {
  SignupRequest,
  SignupRequestSchema,
  SignupResponse,
  SignupResponseSchema,
} from '@/features/auth-join/model/signup-schema'

export const createSignupApi = (apiClient: AxiosInstance) => ({
  async checkEmail(payload: CheckEmailRequest): Promise<CheckEmailResponse> {
    const body = CheckEmailRequestSchema.parse(payload)
    const res = await apiClient.post('api/v1/auth/check-email', body)
    return CheckEmailResponseSchema.parse(res.data)
  },

  async sendEmailCode(
    payload: SendEmailCodeRequest
  ): Promise<SendEmailCodeResponse> {
    const body = SendEmailCodeRequestSchema.parse(payload)
    const res = await apiClient.post('api/v1/auth/email/send-code', body)
    return SendEmailCodeResponseSchema.parse(res.data)
  },

  async verifyEmailCode(
    payload: VerifyEmailCodeRequest
  ): Promise<VerifyEmailCodeResponse> {
    const body = VerifyEmailCodeRequestSchema.parse(payload)
    const res = await apiClient.post('api/v1/auth/email/verify-code', body)
    return VerifyEmailCodeResponseSchema.parse(res.data)
  },

  async checkNickname(
    payload: NicknameCheckRequest
  ): Promise<NicknameCheckResponse> {
    const body = NicknameCheckRequestSchema.parse(payload)
    const res = await apiClient.post('api/v1/auth/check-nickname', body)
    return NicknameCheckResponseSchema.parse(res.data)
  },

  async signup(payload: SignupRequest): Promise<SignupResponse> {
    const body = SignupRequestSchema.parse(payload)
    const res = await apiClient.post('api/v1/auth/signup', body)
    return SignupResponseSchema.parse(res.data)
  },
})
