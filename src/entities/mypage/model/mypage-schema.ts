export type UserRoleServer = 'USER' | 'ADMIN'
export type GenderServer = 'M' | 'F' | null

export interface MeProfileUserServer {
  id: number
  email: string
  nickname: string
  name: string | null
  profile_image_url: string | null
  gender: GenderServer
  birthday: string | null
  phone: string | null
  role: UserRoleServer
  created_at: string
}

export interface GetMyProfileResponse {
  user: MeProfileUserServer
}

export interface PatchMyProfileRequest {
  nickname?: string
  phone?: string
}

export interface PatchMyProfileResponse {
  message: string
  user: MeProfileUserServer
}

export interface PatchProfileImageRequest {
  profile_image_url: string
}

export interface ChangePasswordRequest {
  current_password: string
  new_password: string
  new_password_confirm: string
}

export interface ChangePasswordResponse {
  message: string
  changed_at?: string
}

export interface ValidationErrorResponse {
  [field: string]: string[]
}
