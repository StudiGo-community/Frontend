'use client'

import { useState } from 'react'
import { Volume2 } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

interface BannerData {
  id: number
  type: 'quote' | 'quiz'
  content: string
  correctAnswer?: string
}

interface QuizBannerProps {
  data: BannerData
  isActive: boolean
  onClick: () => void
  imageSrc: string
}

export function QuizBanner({
  data,
  isActive,
  onClick,
  imageSrc,
}: QuizBannerProps) {
  const [quizInput, setQuizInput] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [shouldShake, setShouldShake] = useState(false)

  const isCorrect =
    quizInput.trim().toLowerCase() === data.correctAnswer?.toLowerCase()

  const handleQuizSubmit = () => {
    if (!quizInput) return

    setIsSubmitted(true)

    if (!isCorrect) {
      setShouldShake(true)
      setTimeout(() => setShouldShake(false), 500)
    }
  }

  const renderQuizContent = () => {
    if (!data.content.includes('(____)')) return data.content
    const parts = data.content.split('(____)')

    return (
      <>
        {parts[0]}({' '}
        <span
          className={cn('transition-colors', {
            'text-white': !isSubmitted,
            'text-green-400': isSubmitted && isCorrect,
            'text-brand-error': isSubmitted && !isCorrect,
          })}
        >
          {isSubmitted ? quizInput : '____'}
        </span>{' '}
        ){parts[1]}
      </>
    )
  }

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-in-out',
        isActive ? 'bg-brand-main flex-[2.5]' : 'bg-brand-second flex-1'
      )}
    >
      {/* 배경 이미지 섹션 */}
      <div
        className={cn(
          'absolute inset-0 bg-bottom-right bg-no-repeat transition-all duration-500',
          isActive
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-2 scale-95 opacity-60'
        )}
        style={{
          backgroundImage: `url(${imageSrc})`,
          backgroundSize: 'contain',
        }}
      />
      {!isActive && (
        <div className="bg-brand-second/30 absolute inset-0 backdrop-blur-[0.5px]" />
      )}

      {/* 콘텐츠 섹션 */}
      <div className="relative z-10 flex h-full flex-col justify-start p-6 text-white">
        <div className="mb-2 flex items-center text-xl leading-none font-bold">
          {isActive ? '' : '〈 '}오늘의 문제
        </div>

        {isActive && (
          <div className="animate-in fade-in slide-in-from-right-4 mt-5 mr-28 flex flex-col items-center text-center duration-500">
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-2xl font-black italic">
                {renderQuizContent()}
              </h2>
              <Volume2 size={28} className="cursor-pointer hover:opacity-80" />
            </div>

            <div
              className={cn(
                'flex w-full max-w-md gap-2',
                shouldShake && 'animate-shake'
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="text"
                value={quizInput}
                onChange={(e) => {
                  setQuizInput(e.target.value)
                  if (isSubmitted) setIsSubmitted(false)
                }}
                placeholder="빈칸에 들어갈 단어를 입력해주세요"
                className={cn(
                  'bg-brand-light flex-1 rounded-xl px-6 py-2.5 text-center text-sm text-black transition-colors outline-none',
                  {
                    'ring-brand-error bg-red-50 ring-2':
                      isSubmitted && !isCorrect,
                  }
                )}
                disabled={isSubmitted && isCorrect}
              />
              <button
                onClick={handleQuizSubmit}
                className={cn(
                  'rounded-xl border-2 border-white bg-transparent px-8 py-2.5 font-bold text-white transition-all',
                  {
                    'cursor-default': isSubmitted && isCorrect,
                    'hover:text-brand-main hover:bg-white': !(
                      isSubmitted && isCorrect
                    ),
                  }
                )}
              >
                {isSubmitted && isCorrect ? '정답입니다!' : '정답 제출'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
