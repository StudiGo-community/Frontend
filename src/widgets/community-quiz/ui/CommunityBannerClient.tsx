'use client'

import { useState } from 'react'
import { BannerData, MOCK_BANNER_DATA } from '@/entities/quiz/bannerMockData'
import { QuizBanner } from '@/features/community/ui/QuizBanner'
import { QuoteBanner } from '@/features/community/ui/QuoteBanner'
import QuizImage from '@/features/community/assets/quiz-image.png'
import { useQuiz } from '@/features/community/api/queries'
import { Quote } from '@/entities/quiz/model/schema'

interface CommunityBannerClientProps {
  quiz: BannerData | undefined
  quote: Quote
}

export default function CommunityBannerClient({
  quiz,
  quote,
}: CommunityBannerClientProps) {
  const [activeType, setActiveType] = useState<'quote' | 'quiz'>('quote')

  const quoteData = MOCK_BANNER_DATA.find((b) => b.type === 'quote')
  const { data: quizData } = useQuiz()

  return (
    <section className="flex h-50 w-full gap-4 transition-all duration-500 ease-in-out">
      {quoteData && (
        <QuoteBanner
          data={quote}
          isActive={activeType === 'quote'}
          onClick={() => setActiveType('quote')}
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
    </section>
  )
}
