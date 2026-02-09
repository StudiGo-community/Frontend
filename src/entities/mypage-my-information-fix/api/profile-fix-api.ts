import { api } from '@/shared/api/client'
import {
  ChangePasswordRequestSchema,
  CheckNicknameRequestSchema,
  CheckNicknameResponseSchema,
  DeleteProfileImageResponseSchema,
  GetMyProfileResponseSchema,
  PatchMyProfileRequestSchema,
  PatchMyProfileResponseSchema,
  PatchProfileImageRequestSchema,
  PatchProfileImageResponseSchema,
  type ChangePasswordRequest,
  type CheckNicknameRequest,
  type CheckNicknameResponse,
  type DeleteProfileImageResponse,
  type GetMyProfileResponse,
  type PatchMyProfileRequest,
  type PatchMyProfileResponse,
  type PatchProfileImageRequest,
  type PatchProfileImageResponse,
} from '@/entities/mypage-my-information-fix/model/profile-fix-schema'

function createSchemaValidationError(message: string): Error {
  return new Error(message)
}

export async function getMyProfileApi(): Promise<GetMyProfileResponse> {
  const response = await api.get('/me/profile')

  const schemaParseResult = GetMyProfileResponseSchema.safeParse(response.data)
  if (!schemaParseResult.success) {
    throw createSchemaValidationError(
      '프로필 조회 응답 형식이 올바르지 않습니다.'
    )
  }

  return schemaParseResult.data
}

export async function patchMyProfileApi(
  requestBody: PatchMyProfileRequest
): Promise<PatchMyProfileResponse> {
  const validatedRequestBody = PatchMyProfileRequestSchema.parse(requestBody)
  const response = await api.patch('/me/profile', validatedRequestBody)

  const schemaParseResult = PatchMyProfileResponseSchema.safeParse(
    response.data
  )
  if (!schemaParseResult.success) {
    throw createSchemaValidationError(
      '프로필 수정 응답 형식이 올바르지 않습니다.'
    )
  }

  return schemaParseResult.data
}

export async function patchProfileImageApi(
  requestBody: PatchProfileImageRequest
): Promise<PatchProfileImageResponse> {
  const validatedRequestBody = PatchProfileImageRequestSchema.parse(requestBody)
  const response = await api.patch('/me/profile/image', validatedRequestBody)

  const schemaParseResult = PatchProfileImageResponseSchema.safeParse(
    response.data
  )
  if (!schemaParseResult.success) {
    throw createSchemaValidationError(
      '프로필 이미지 수정 응답 형식이 올바르지 않습니다.'
    )
  }

  return schemaParseResult.data
}

export async function deleteProfileImageApi(): Promise<DeleteProfileImageResponse> {
  const response = await api.delete('/me/profile/image')

  const schemaParseResult = DeleteProfileImageResponseSchema.safeParse(
    response.data ?? {}
  )
  if (!schemaParseResult.success) {
    throw createSchemaValidationError(
      '프로필 이미지 삭제 응답 형식이 올바르지 않습니다.'
    )
  }

  return schemaParseResult.data
}

export async function changePasswordApi(
  requestBody: ChangePasswordRequest
): Promise<void> {
  const validatedRequestBody = ChangePasswordRequestSchema.parse(requestBody)
  await api.put('/me/profile/password', validatedRequestBody)
}

export async function checkNicknameApi(
  requestBody: CheckNicknameRequest
): Promise<CheckNicknameResponse> {
  const validatedRequestBody = CheckNicknameRequestSchema.parse(requestBody)
  const response = await api.post('/auth/check-nickname', validatedRequestBody)

  const schemaParseResult = CheckNicknameResponseSchema.safeParse(response.data)
  if (!schemaParseResult.success) {
    throw createSchemaValidationError(
      '닉네임 중복 확인 응답 형식이 올바르지 않습니다.'
    )
  }

  return schemaParseResult.data
}
