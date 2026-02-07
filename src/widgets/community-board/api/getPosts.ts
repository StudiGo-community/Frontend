import { api } from '@/shared/api/client'
import { PostList, PostListSchema } from '@/entities/post/model/post.schema'
import { GetPostsParamsSchema } from '@/widgets/community-board/model/schema'
import { handleActionError } from '@/shared/api/handleActionError'

interface GetPostsParams {
  page?: string
  category?: string
  sort?: string
  q?: string
}

export const getPosts = async (params?: GetPostsParams): Promise<PostList> => {
  // TODO: 파라미터 유효성 검사 nuqs로 바꾸기?
  const validatedParams = GetPostsParamsSchema.safeParse(params)

  try {
    const response = await api.get('/posts', {
      params: validatedParams.data,
    })

    return PostListSchema.parse(response.data)
  } catch (error) {
    return handleActionError(error, '게시글 목록을 불러오는데 실패했습니다.')
  }
}
