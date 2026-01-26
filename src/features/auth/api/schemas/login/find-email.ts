import z from 'zod'
import {
  ErrorResponseSchema,
  UserProviderSchema,
} from '@/features/auth/api/schemas/login/common'

export const FindEmailSendCodeRequestSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  phone: z.string().min(8, '올바른 휴대폰 번호를 입력해주세요.'),
})

export type FindEmailSendCodeRequest = z.infer<
  typeof FindEmailSendCodeRequestSchema
>

export const FindEmailSendCodeResponseSchema = z
  .object({
    message: z.string(),
    expires_in: z.number().int().positive(),
  })
  .transform((data) => ({
    message: data.message,
    expiresIn: data.expires_in,
  }))

export type FindEmailSendCodeResponse = z.infer<
  typeof FindEmailSendCodeResponseSchema
>

export const FindEmailSendCodeErrorSchema = ErrorResponseSchema.extend({
  error_code: z.enum(['USER_NOT_FOUND', 'WITHDRAWN_ACCOUNT']),
})

export type FindEmailSendCodeError = z.infer<
  typeof FindEmailSendCodeErrorSchema
>

export const FindEmailVerifyRequestSchema = z.object({
  name: z.string().min(1, '이름을 입력해주세요.'),
  phone: z.string().min(8, '올바른 휴대폰 번호를 입력해주세요.'),
  code: z.string().length(6, '인증번호 6자리를 입력해주세요.'),
})

export type FindEmailVerifyRequest = z.infer<
  typeof FindEmailVerifyRequestSchema
>

const FindEmailAccountSchema = z
  .object({
    email: z.string(),
    provider: UserProviderSchema,
    created_at: z.string(),
  })
  .transform((data) => ({
    email: data.email,
    provider: data.provider,
    createdAt: data.created_at,
  }))

export const FindEmailVerifyResponseSchema = z
  .object({
    accounts: z.array(FindEmailAccountSchema),
  })
  .transform((data) => ({
    accounts: data.accounts,
  }))

export type FindEmailVerifyResponse = z.infer<
  typeof FindEmailVerifyResponseSchema
>

export const FindEmailVerifyErrorSchema = ErrorResponseSchema.extend({
  error_code: z.enum([
    'INVALID_CODE',
    'USER_NOT_FOUND',
    'INVALID_NICKNAME_LENGTH', // 명세서 비고란의 에러코드 포함
    'INVALID_NICKNAME_FORMAT',
    'NICKNAME_ALREADY_EXISTS',
  ]),
})

export type FindEmailVerifyError = z.infer<typeof FindEmailVerifyErrorSchema>
