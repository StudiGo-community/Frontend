'use client'

import { useState } from 'react'
import { QuizBanner } from '@/widgets/community-quiz/ui/QuizBanner'
import { QuoteBanner } from '@/widgets/community-quiz/ui/QuoteBanner'
import {
  Quote,
  BeforeQuizResponse,
  AfterQuizResponse,
} from '@/entities/quiz/model/schema'

interface CommunityBannerClientProps {
  quiz: BeforeQuizResponse | AfterQuizResponse
  quote: Quote
}

export default function CommunityBannerClient({
  quiz,
  quote,
}: CommunityBannerClientProps) {
  const [activeType, setActiveType] = useState<'quote' | 'quiz'>('quote')

  return (
    <section className="flex h-50 w-full gap-4 transition-all duration-500 ease-in-out">
      {quote && (
        <QuoteBanner
          data={quote}
          isActive={activeType === 'quote'}
          onClick={() => setActiveType('quote')}
        />
      )}
      {quiz && (
        <QuizBanner
          data={quiz}
          isActive={activeType === 'quiz'}
          onClick={() => setActiveType('quiz')}
        />
      )}
    </section>
  )
}
