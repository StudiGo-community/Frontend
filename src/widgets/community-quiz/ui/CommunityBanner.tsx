import CommunityBannerClient from '@/widgets/community-quiz/ui/CommunityBannerClient'
import { getQuote } from '@/widgets/community-quiz/api/getQuote'
import { getQuiz } from '@/widgets/community-quiz/api/getQuiz'

export default async function CommunityBanner() {
  const [quote, quiz] = await Promise.all([getQuote(), getQuiz()])

  return <CommunityBannerClient quiz={quiz} quote={quote} />
}
