import { cache } from 'react'
import { cookies } from 'next/headers'
import { api } from '@/shared/api/client'
import { isAxiosError } from 'axios'
import { PostDetail, PostDetailSchema } from '@/entities/post/model/post.schema'
import { handleActionError } from '@/shared/api/handleActionError'

const getPost = cache(async (id: number): Promise<PostDetail | null> => {
  try {
    const cookieStore = await cookies()
    const response = await api.get(`/posts/${id}`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    })
    return PostDetailSchema.parse(response.data)
  } catch (error) {
    // 게시글 수정에서 잘못된 URL 일때 null 반환 (목록과 마찬가지로 없으면 null이 적절한 반환값)
    if (isAxiosError(error) && error.response?.status === 404) {
      return null
    }
    return handleActionError(error, '게시글을 불러오는데 실패했습니다.')
  }
})

export default getPost
