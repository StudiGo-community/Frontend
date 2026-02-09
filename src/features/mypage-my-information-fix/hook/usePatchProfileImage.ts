import { useMutation, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'
import { toast } from 'sonner'
import { api } from '@/shared/api/client'

const PatchProfileImageRequestSchema = z.object({
  profile_image_url: z.string(),
})

type PatchProfileImageRequest = z.infer<typeof PatchProfileImageRequestSchema>

const PatchProfileImageResponseSchema = z.object({
  message: z.string(),
  user: z.object({
    id: z.number(),
    nickname: z.string(),
    profile_image_url: z.string(),
    updated_at: z.string(),
  }),
})

type PatchProfileImageResponse = z.infer<typeof PatchProfileImageResponseSchema>

function getApiErrorMessageFromUnknownError(error: unknown): string | null {
  if (!error || typeof error !== 'object') return null
  const errorRecord = error as Record<string, unknown>

  const response = errorRecord['response']
  if (!response || typeof response !== 'object') return null
  const responseRecord = response as Record<string, unknown>

  const data = responseRecord['data']
  if (!data || typeof data !== 'object') return null
  const dataRecord = data as Record<string, unknown>

  const backendMessage = dataRecord['message']
  if (typeof backendMessage === 'string' && backendMessage.length > 0) {
    return backendMessage
  }

  const backendDetail = dataRecord['detail']
  if (typeof backendDetail === 'string' && backendDetail.length > 0) {
    return backendDetail
  }

  for (const value of Object.values(dataRecord)) {
    if (
      Array.isArray(value) &&
      value.every((item) => typeof item === 'string')
    ) {
      const joined = value.join('\n').trim()
      if (joined.length > 0) return joined
    }
  }

  return null
}

async function patchProfileImageApi(
  payload: PatchProfileImageRequest
): Promise<PatchProfileImageResponse> {
  const validatedPayload = PatchProfileImageRequestSchema.parse(payload)
  const response = await api.patch('/me/profile/image', validatedPayload)

  const parsed = PatchProfileImageResponseSchema.safeParse(response.data)
  if (!parsed.success) {
    throw new Error('프로필 이미지 수정 응답 형식이 올바르지 않습니다.')
  }

  return parsed.data
}

export function usePatchProfileImage() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: patchProfileImageApi,
    onSuccess: (data) => {
      queryClient.setQueryData(['mypage', 'profile'], (previous: unknown) => {
        if (!previous || typeof previous !== 'object') return previous
        const previousRecord = previous as Record<string, unknown>
        const previousUser = previousRecord['user']
        if (!previousUser || typeof previousUser !== 'object') return previous

        const previousUserRecord = previousUser as Record<string, unknown>
        return {
          ...previousRecord,
          user: {
            ...previousUserRecord,
            nickname: data.user.nickname,
            profile_image_url: data.user.profile_image_url,
            updated_at: data.user.updated_at,
          },
        }
      })

      void queryClient.invalidateQueries({ queryKey: ['mypage', 'profile'] })
    },
    onError: (error) => {
      const backendMessage = getApiErrorMessageFromUnknownError(error)
      const message =
        backendMessage ??
        (error instanceof Error
          ? error.message
          : '프로필 이미지 변경에 실패했습니다.')
      toast.error(message)
    },
  })
}
