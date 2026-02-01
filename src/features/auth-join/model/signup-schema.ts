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
    email_verification_token: z.string().min(1, '이메일 인증을 완료해주세요.'),

    password: PasswordSchema,
    password_confirm: z.string(),

    nickname: z.string().min(1, '닉네임을 입력해주세요.'),
    name: z.string().min(1, '이름을 입력해주세요.'),

    gender: z.enum(['M', 'F']).optional(),
    phone: z.string().optional(),
    phone_verification_token: z.string().optional(),
    birthdate: z.string().optional(),

    terms_agreed: z.boolean(),
    privacy_agreed: z.boolean(),
    marketing_agreed: z.boolean().optional(),
  })
  .superRefine((v, ctx) => {
    if (v.password !== v.password_confirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['password_confirm'],
        message: '비밀번호가 일치하지 않습니다.',
      })
    }
    if (!v.terms_agreed) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['terms_agreed'],
        message: '이용약관에 동의해주세요.',
      })
    }
    if (!v.privacy_agreed) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['privacy_agreed'],
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
