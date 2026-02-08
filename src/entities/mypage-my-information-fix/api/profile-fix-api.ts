import { api } from '@/shared/api/client'
import {
  ChangePasswordRequestSchema,
  ChangePasswordResponseSchema,
  DeleteProfileImageResponseSchema,
  GetMyProfileResponseSchema,
  PatchMyProfileRequestSchema,
  PatchMyProfileResponseSchema,
  PatchProfileImageRequestSchema,
  PatchProfileImageResponseSchema,
  type ChangePasswordRequest,
  type ChangePasswordResponse,
  type DeleteProfileImageResponse,
  type GetMyProfileResponse,
  type PatchMyProfileRequest,
  type PatchMyProfileResponse,
  type PatchProfileImageRequest,
  type PatchProfileImageResponse,
} from '@/entities/mypage-my-information-fix/model/profile-fix-schema'

function createSchemaErrorMessage(message: string): Error {
  return new Error(message)
}

export async function getMyProfileApi(): Promise<GetMyProfileResponse> {
  const response = await api.get('/me/profile')
  const parsed = GetMyProfileResponseSchema.safeParse(response.data)

  if (!parsed.success) {
    throw createSchemaErrorMessage('프로필 조회 응답 형식이 올바르지 않습니다.')
  }

  return parsed.data
}

export async function patchMyProfileApi(
  requestBody: PatchMyProfileRequest
): Promise<PatchMyProfileResponse> {
  const validatedRequestBody = PatchMyProfileRequestSchema.parse(requestBody)
  const response = await api.patch('/me/profile', validatedRequestBody)

  const parsed = PatchMyProfileResponseSchema.safeParse(response.data)
  if (!parsed.success) {
    throw createSchemaErrorMessage('프로필 수정 응답 형식이 올바르지 않습니다.')
  }

  return parsed.data
}

export async function patchProfileImageApi(
  requestBody: PatchProfileImageRequest
): Promise<PatchProfileImageResponse> {
  const validatedRequestBody = PatchProfileImageRequestSchema.parse(requestBody)
  const response = await api.patch('/me/profile/image', validatedRequestBody)

  const parsed = PatchProfileImageResponseSchema.safeParse(response.data)
  if (!parsed.success) {
    throw createSchemaErrorMessage(
      '프로필 이미지 수정 응답 형식이 올바르지 않습니다.'
    )
  }

  return parsed.data
}

export async function deleteProfileImageApi(): Promise<DeleteProfileImageResponse> {
  const response = await api.delete('/me/profile/image')

  const parsed = DeleteProfileImageResponseSchema.safeParse(response.data)
  if (!parsed.success) {
    throw createSchemaErrorMessage(
      '프로필 이미지 삭제 응답 형식이 올바르지 않습니다.'
    )
  }

  return parsed.data
}

export async function changePasswordApi(
  requestBody: ChangePasswordRequest
): Promise<ChangePasswordResponse> {
  const validatedRequestBody = ChangePasswordRequestSchema.parse(requestBody)
  const response = await api.put('/me/profile/password', validatedRequestBody)

  const parsed = ChangePasswordResponseSchema.safeParse(response.data)
  if (!parsed.success) {
    throw createSchemaErrorMessage(
      '비밀번호 변경 응답 형식이 올바르지 않습니다.'
    )
  }

  return parsed.data
}
