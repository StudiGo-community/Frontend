import { api } from '@/shared/api/client'
import type {
  ChangePasswordRequest,
  ChangePasswordResponse,
  GetMyProfileResponse,
  PatchMyProfileRequest,
  PatchMyProfileResponse,
  PatchProfileImageRequest,
} from '@/entities/mypage/model/mypage-schema'

export const getMyProfileApi = async () => {
  const { data } = await api.get<GetMyProfileResponse>('/me/profile')
  return data
}

export const patchMyProfileApi = async (body: PatchMyProfileRequest) => {
  const { data } = await api.patch<PatchMyProfileResponse>('/me/profile', body)
  return data
}

export const patchProfileImageApi = async (body: PatchProfileImageRequest) => {
  const { data } = await api.patch('/me/profile/image', body)
  return data
}

export const deleteProfileImageApi = async () => {
  await api.delete('/me/profile/image')
}

export const changePasswordApi = async (body: ChangePasswordRequest) => {
  const { data } = await api.put<ChangePasswordResponse>(
    '/me/profile/password',
    body
  )
  return data
}
