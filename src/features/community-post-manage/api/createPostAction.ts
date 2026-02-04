'use server'

import { isAxiosError } from 'axios'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { api } from '@/shared/api/client'
import {
  PostCreateForm,
  PostCreateFormSchema,
} from '@/features/community-post-manage/model/post-create.schema'

export async function createPostAction(data: PostCreateForm) {
  // 입력값 검증 (혹시 클라이언트 측 RHF이 뚫릴 경우를 대비)
  const parsed = PostCreateFormSchema.safeParse(data)

  if (!parsed.success) {
    // parsed.error.issues 배열을 순회하며 메시지만 뽑아서 합침 (' / '로 연결)
    const errorMessage = parsed.error.issues
      .map((issue) => issue.message)
      .join(' / ')
    throw new Error(errorMessage)
  }

  // 스네이크 케이스로 변환
  const { thumbnailUrl, ...rest } = parsed.data
  const payload = {
    ...rest,
    thumbnail_url: thumbnailUrl,
  }

  // API 호출
  try {
    // Server Action에서는 쿠키를 자동으로 전달하지 않으므로 직접 설정
    const cookieStore = await cookies()
    const response = await api.post('/posts', payload, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    })

    // 캐시 갱신 (경로: /community)
    revalidatePath('/community')

    return response.data
  } catch (error: unknown) {
    // 에러를 던져줌 (훅에서 받아서 처리)
    if (isAxiosError(error)) {
      const status = error.response?.status

      if (status === 401) {
        throw new Error('로그인이 필요하거나 만료되었습니다.')
      }

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        '게시글 등록에 실패했습니다.'
      throw new Error(errorMessage)
    }

    if (error instanceof Error) {
      throw error
    }

    throw new Error('알 수 없는 에러가 발생했습니다.')
  }
}
