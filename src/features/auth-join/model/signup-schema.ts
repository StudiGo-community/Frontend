import z from 'zod'
import { ErrorResponseSchema } from '@/shared/api/error-schema'
import { EmailSchema } from './check-email-schema'

const PasswordSchema = z
  .string()
  .min(8, '비밀번호는 8자 이상이어야 합니다.')
  .regex(/[A-Za-z]/, '비밀번호에 영문이 포함되어야 합니다.')
  .regex(/[0-9]/, '비밀번호에 숫자가 포함되어야 합니다.')

export const SignupRequestSchema = z
  .object({
    email: EmailSchema,

    password: PasswordSchema,
    password_confirm: z.string(),

    nickname: z.string().min(1, '닉네임을 입력해주세요.'),
    name: z.string().min(1, '이름을 입력해주세요.'),

    gender: z.enum(['M', 'F']).optional(),
    phone: z.string().optional(),
    birthday: z.string().optional(),

    agree_terms: z.boolean(),
    agree_privacy: z.boolean(),
    agree_marketing: z.boolean(),

    nickname_check_token: z.string().min(1, '닉네임 중복 확인을 완료해주세요.'),
    email_verify_token: z.string().min(1, '이메일 인증을 완료해주세요.'),
  })
  .superRefine((v, ctx) => {
    if (v.password !== v.password_confirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['password_confirm'],
        message: '비밀번호가 일치하지 않습니다.',
      })
    }
    if (!v.agree_terms) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['agree_terms'],
        message: '이용약관에 동의해주세요.',
      })
    }
    if (!v.agree_privacy) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['agree_privacy'],
        message: '개인정보처리방침에 동의해주세요.',
      })
    }
  })

export type SignupRequest = z.infer<typeof SignupRequestSchema>

export const SignupResponseSchema = z.object({
  message: z.string(),
  user: z.object({
    id: z.number(),
    email: z.string(),
    nickname: z.string(),
    created_at: z.string(),
  }),
})
export type SignupResponse = z.infer<typeof SignupResponseSchema>

export const SignupErrorSchema = ErrorResponseSchema.extend({
  error_code: z.enum([
    'INVALID_VERIFICATION_TOKEN',
    'TOKEN_EXPIRED',
    'PASSWORD_MISMATCH',
    'INVALID_PASSWORD_FORMAT',
    'EMAIL_ALREADY_EXISTS',
    'NICKNAME_ALREADY_EXISTS',
    'PHONE_ALREADY_EXISTS',
    'TERMS_NOT_AGREED',
    'TOO_MANY_REQUEST',
  ]),
  retry_after: z.number().optional(),
})
export type SignupError = z.infer<typeof SignupErrorSchema>
