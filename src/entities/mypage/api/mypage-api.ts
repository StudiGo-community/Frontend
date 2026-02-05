import { api } from '@/shared/api/client'
import type {
  GetMyProfileResponse,
  PatchMyProfileRequest,
  PatchMyProfileResponse,
  PatchProfileImageRequest,
  ChangePasswordRequest,
  ChangePasswordResponse,
} from '@/entities/mypage/model/mypage-schema'

export const getMyProfile = async () => {
  const { data } = await api.get<GetMyProfileResponse>('/me/profile')
  return data
}

export const patchMyProfile = async (body: PatchMyProfileRequest) => {
  const { data } = await api.patch<PatchMyProfileResponse>('/me/profile', body)
  return data
}

export const patchProfileImage = async (body: PatchProfileImageRequest) => {
  const { data } = await api.patch('/me/profile/image', body)
  return data
}

export const deleteProfileImage = async () => {
  await api.delete('/me/profile/image')
}

export const changePassword = async (body: ChangePasswordRequest) => {
  const { data } = await api.put<ChangePasswordResponse>(
    '/me/profile/password',
    body
  )
  return data
}
