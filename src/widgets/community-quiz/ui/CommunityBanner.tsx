import CommunityBannerClient from '@/widgets/community-quiz/ui/CommunityBannerClient'
import { Suspense } from 'react'
import ApiErrorBoundary from '@/shared/ui/ApiErrorBoundary'
import { getQuote } from '@/widgets/community-quiz/api/getQuote'
import { getQuiz } from '@/widgets/community-quiz/api/getQuiz'

export default async function CommunityBanner() {
  const [quote, quiz] = await Promise.all([getQuote(), getQuiz()])

  return (
    <ApiErrorBoundary>
      <Suspense fallback={<div>로딩중...</div>}>
        <CommunityBannerClient quiz={quiz} quote={quote} />
      </Suspense>
    </ApiErrorBoundary>
  )
}
