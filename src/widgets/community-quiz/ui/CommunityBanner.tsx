import { MOCK_BANNER_DATA } from '@/entities/quiz/bannerMockData'
import CommunityBannerClient from '@/widgets/community-quiz/ui/CommunityBannerClient'
import { Suspense } from 'react'
import ApiErrorBoundary from '@/shared/ui/ApiErrorBoundary'
import { getQuote } from '@/widgets/community-quiz/api/getQuote'

export default async function CommunityBanner() {
  const quote = await getQuote()
  console.log(quote)

  const quiz = MOCK_BANNER_DATA.find((b) => b.type === 'quiz')

  return (
    <ApiErrorBoundary>
      <Suspense fallback={<div>로딩중...</div>}>
        <CommunityBannerClient quiz={quiz} quote={quote} />
      </Suspense>
    </ApiErrorBoundary>
  )
}
