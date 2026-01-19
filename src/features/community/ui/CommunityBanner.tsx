'use client'

import { useState } from 'react'
import { MOCK_BANNER_DATA } from '@/features/community/bannerMockData'
import { QuizBanner } from '@/features/community/ui/QuizBanner'
import { QuoteBanner } from '@/features/community/ui/QuoteBanner'
import QuoteImage from '@/features/community/assets/quote-image.png'
import QuizImage from '@/features/community/assets/quiz-image.png'

export default function CommunityBanner() {
  const [activeType, setActiveType] = useState<'quote' | 'quiz'>('quote')

  const quoteData = MOCK_BANNER_DATA.find((b) => b.type === 'quote')
  const quizData = MOCK_BANNER_DATA.find((b) => b.type === 'quiz')

  return (
    <div className="flex h-50 w-full gap-4 transition-all duration-500 ease-in-out">
      {quoteData && (
        <QuoteBanner
          data={quoteData}
          isActive={activeType === 'quote'}
          onClick={() => setActiveType('quote')}
          imageSrc={QuoteImage.src}
        />
      )}
      {quizData && (
        <QuizBanner
          data={quizData}
          isActive={activeType === 'quiz'}
          onClick={() => setActiveType('quiz')}
          imageSrc={QuizImage.src}
        />
      )}
    </div>
  )
}
