import { api } from '@/shared/api/client'
import { isAxiosError } from 'axios'
import { PostDetail, PostDetailSchema } from '@/entities/post/model/post.schema'
import { handleActionError } from '@/shared/api/handleActionError'

export default async function getPost(id: number): Promise<PostDetail | null> {
  try {
    const response = await api.get(`/posts/${id}`)
    return PostDetailSchema.parse(response.data)
  } catch (error) {
    // TODO: 처리 방식 고민: 없는 게시글 URL이면 아예 not-found가 나을듯함
    // 게시글 수정에서 잘못된 URL 일때 null 반환
    if (isAxiosError(error) && error.response?.status === 404) {
      return null
    }
    return handleActionError(error, '게시글을 불러오는데 실패했습니다.')
  }
}
