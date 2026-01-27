// TODO: CommunityFilters.tsx에 정의해놓은거랑 겹치니까 처리하기
export type CommunityCategory = 'all' | 'free' | 'recruit' | 'study'
export type CommunitySort = 'popular' | 'latest'

export interface CommunityBoardSearchParams {
  page?: string
  category?: CommunityCategory
  sort?: CommunitySort
  query?: string
}
