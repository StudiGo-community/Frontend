'use client'

import { useState } from 'react'
import { QuizBanner } from '@/features/community/ui/QuizBanner'
import { QuoteBanner } from '@/features/community/ui/QuoteBanner'
import {
  Quote,
  BeforeQuizResponse,
  AfterQuizResponse,
} from '@/entities/quiz/model/schema'
import QuizImage from '@/features/community/assets/quiz-image.png'

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
          imageSrc={QuizImage.src}
        />
      )}
    </section>
  )
}
