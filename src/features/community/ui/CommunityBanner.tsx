'use client'

import React, { useState } from 'react'
import { MOCK_BANNER_DATA } from '@/features/bannerMockData'
import { QuizBanner } from '@/features/community/ui/QuizBanner'
import { QuoteBanner } from '@/features/community/ui/QuoteBanner'
import QuoteImage from '@/assets/quote-image.png'
import QuizImage from '@/assets/quiz-image.png'

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

      <style jsx global>{`
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-4px);
          }
          75% {
            transform: translateX(4px);
          }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  )
}
