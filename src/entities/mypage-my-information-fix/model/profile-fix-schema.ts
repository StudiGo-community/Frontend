import { z } from 'zod'

export const UserRoleSchema = z
  .enum(['USER', 'ADMIN', 'INSTRUCTOR'])
  .catch('USER')

export const UserProfileSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  nickname: z.string(),
  name: z.string(),
  profile_image_url: z.string().nullable(),
  gender: z.string().nullable().optional(),
  birthday: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  role: UserRoleSchema.optional(),
  created_at: z.string().optional(),
})

export type UserProfile = z.infer<typeof UserProfileSchema>

export const GetMyProfileResponseSchema = z.object({
  user: UserProfileSchema,
})
export type GetMyProfileResponse = z.infer<typeof GetMyProfileResponseSchema>

export const PatchMyProfileRequestSchema = z.object({
  nickname: z.string().min(1),
})
export type PatchMyProfileRequest = z.infer<typeof PatchMyProfileRequestSchema>

export const PatchMyProfileResponseSchema = z.object({
  message: z.string().optional(),
  user: UserProfileSchema,
})
export type PatchMyProfileResponse = z.infer<
  typeof PatchMyProfileResponseSchema
>

export const PatchProfileImageRequestSchema = z.object({
  profile_image_url: z.string().min(1),
})
export type PatchProfileImageRequest = z.infer<
  typeof PatchProfileImageRequestSchema
>

export const PatchProfileImageResponseSchema = z.object({
  message: z.string().optional(),
  user: UserProfileSchema.optional(),
})
export type PatchProfileImageResponse = z.infer<
  typeof PatchProfileImageResponseSchema
>

export const DeleteProfileImageResponseSchema = z.object({
  message: z.string().optional(),
})
export type DeleteProfileImageResponse = z.infer<
  typeof DeleteProfileImageResponseSchema
>

export const ChangePasswordRequestSchema = z
  .object({
    current_password: z.string().min(1),
    new_password: z.string().min(1),
    new_password_confirm: z.string().min(1),
  })
  .refine(
    (requestBody) =>
      requestBody.new_password === requestBody.new_password_confirm,
    'new_password와 new_password_confirm이 일치해야 합니다.'
  )

export type ChangePasswordRequest = z.infer<typeof ChangePasswordRequestSchema>
export type ChangePasswordResponse = void

export const CheckNicknameRequestSchema = z.object({
  nickname: z.string().min(1),
})
export type CheckNicknameRequest = z.infer<typeof CheckNicknameRequestSchema>

export const CheckNicknameResponseSchema = z.object({
  message: z.string(),
  check_token: z.string(),
  expires_in: z.number(),
})
export type CheckNicknameResponse = z.infer<typeof CheckNicknameResponseSchema>
