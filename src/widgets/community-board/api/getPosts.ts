import { api } from '@/shared/api/client'
import { PostList, PostListSchema } from '@/entities/post/model/post.schema'
import { GetPostsParamsSchema } from '@/widgets/community-board/model/schema'

interface GetPostsParams {
  page?: string
  category?: string
  sort?: string
  q?: string
}

export const getPosts = async (params?: GetPostsParams): Promise<PostList> => {
  // TODO: 파라미터 유효성 검사 nuqs로 바꾸기?
  const validatedParams = GetPostsParamsSchema.safeParse(params)

  const response = await api.get('/posts', {
    params: validatedParams.data,
  })

  return PostListSchema.parse(response.data)
}
