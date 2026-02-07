'use server'

import { handleActionError } from '@/shared/api/handle-action-error'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'
import { api } from '@/shared/api/client'
import {
  PostCreateForm,
  PostCreateFormSchema,
  PostCreateResponse,
  PostCreateResponseSchema,
} from '@/features/community-post-manage/model/post-create.schema'

import { validateData } from '@/shared/lib/validateData'

export const createPostAction = async (
  data: PostCreateForm
): Promise<PostCreateResponse> => {
  // 입력값 검증 (혹시 클라이언트 측 RHF이 뚫릴 경우를 대비)
  const { thumbnailUrl, ...rest } = validateData(PostCreateFormSchema, data)
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

    return PostCreateResponseSchema.parse(response.data)
  } catch (error: unknown) {
    // 에러를 던져줌 (훅에서 받아서 처리)
    return handleActionError(error, '게시글 등록에 실패했습니다.')
  }
}
