import z from 'zod'
import { POST_CATEGORIES } from '@/entities/post/model/constants'
import { CommunitySortEnum } from '@/widgets/community-board/model/types'

export const GetPostsParamsSchema = z.object({
  page: z.coerce.number().int().positive().optional().catch(undefined),
  category: z.enum(POST_CATEGORIES).optional().catch(undefined),
  sort: z.enum(CommunitySortEnum).optional().catch(undefined),
  query: z.string().optional(),
})
