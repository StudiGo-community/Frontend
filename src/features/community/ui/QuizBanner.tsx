'use client'

import { useState } from 'react'
import { CheckCircle2Icon, Volume2 } from 'lucide-react'
import { cn } from '@/shared/lib/cn'
import { QuizResponse } from '@/entities/quiz/model/schema'
import { useQuizResult, useSubmitQuiz } from '@/features/community/api/queries'
import QuizInputForm from '@/features/community/ui/QuizInputForm'

interface QuizBannerProps {
  data: QuizResponse
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
  const { data: quizResult } = useQuizResult()
  const { mutate: submitQuiz, data: quizSubmitResult } = useSubmitQuiz()
  const isSubmitted = quizResult?.status === 'COMPLETED' || !!quizSubmitResult
  const isCorrect =
    quizResult?.submission.isCorrect ?? quizSubmitResult?.submission.isCorrect

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuizInput(event.target.value)
  }
  const handleQuizSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!quizInput) return
    submitQuiz({ submittedAnswerText: quizInput })
  }

  const renderQuizContent = () => {
    if (quizResult) return quizResult.question.prompt
    if (!data.question.prompt.includes('______')) return data.question.prompt
    const parts = data.question.prompt.split('______')

    return (
      <>
        {parts[0]}({' '}
        <span
          className={cn('transition-colors', {
            'text-white': !isSubmitted,
            'text-green-400': isSubmitted && isCorrect,
            'text-brand-gray-300': isSubmitted && !isCorrect,
          })}
        >
          {isSubmitted ? quizInput : '______'}
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
        <div className="mb-2 flex items-center text-2xl leading-none font-bold">
          {isActive ? '' : '〈 '}오늘의 문제
          {isActive && isSubmitted && (
            <div className="ml-2 flex items-center gap-2 rounded-xl border-2 border-white bg-transparent px-2 py-1 text-sm font-bold text-white">
              <CheckCircle2Icon size={16} />
              <span>풀이 완료</span>
            </div>
          )}
        </div>

        {isActive && (
          <div className="animate-in fade-in slide-in-from-right-4 mt-4 mr-28 flex flex-col items-center text-center duration-500">
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-2xl font-black italic">
                {renderQuizContent()}
              </h2>
              <Volume2 size={28} className="cursor-pointer hover:opacity-80" />
            </div>
            <div
              className={cn('flex w-full max-w-md gap-2')}
              onClick={(e) => e.stopPropagation()}
            >
              {isSubmitted ? (
                <div className="flex">
                  <span className="text-xl font-bold opacity-90">
                    {quizResult?.explanation ?? quizSubmitResult?.explanation}
                  </span>
                </div>
              ) : (
                <QuizInputForm
                  value={quizInput}
                  isSubmitted={isSubmitted}
                  isCorrect={isCorrect}
                  onChange={handleInputChange}
                  onSubmit={handleQuizSubmit}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
