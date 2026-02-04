import { POST_CATEGORIES } from '@/entities/post/model/constants'

export type CommunityCategory = (typeof POST_CATEGORIES)[number]
export const CommunitySortEnum = ['popular', 'latest', 'oldest'] as const
export type CommunitySort = (typeof CommunitySortEnum)[number]
export type CommunitySearchType = 'all' | 'title' | 'content'

export interface CommunityBoardSearchParams {
  page?: string
  category?: CommunityCategory
  sort?: CommunitySort
  query?: string
  searchType?: CommunitySearchType
}
