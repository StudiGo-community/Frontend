'use client'

import { cn } from '@/shared/lib/cn'
import {
  AfterQuizResponse,
  BeforeQuizResponse,
} from '@/entities/quiz/model/schema'
import QuizImage from '@/features/community/assets/quiz-image.png'
import Image from 'next/image'
import { useState } from 'react'
import { QuizInputForm } from './QuizInputForm'
import TtsButton from './TtsButton'

interface QuizBannerProps {
  data: BeforeQuizResponse | AfterQuizResponse
  isActive: boolean
  onClick: () => void
}

export function QuizBanner({ data, isActive, onClick }: QuizBannerProps) {
  const checkIsSubmitted = (
    data: BeforeQuizResponse | AfterQuizResponse
  ): data is AfterQuizResponse => 'isCorrect' in data

  const isSubmitted = checkIsSubmitted(data)

  const isCorrect = isSubmitted ? data.isCorrect : undefined

  const handleQuizSubmit = () => {
    // API Call logic here
    console.log('Submit')
  }

  console.log(data)

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative flex cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-in-out lg:pr-44',
        isActive ? 'bg-brand-main flex-[1.8]' : 'bg-brand-second flex-1'
      )}
    >
      <div className="text-brand-white relative z-10 flex h-full grow flex-col justify-start p-6 pl-10">
        {/* 제목 */}
        <div className="flex items-center justify-between">
          <span className="border-brand-white border-b-2 text-xl font-semibold whitespace-nowrap">
            {isActive ? '' : '〈 '}오늘의 문제
          </span>
          {/* {isActive && isSubmitted && (
            <div className="ml-2 flex items-center gap-2 rounded-xl border-2 border-white bg-transparent px-2 py-1 text-sm font-bold text-white">
              <CheckCircle2Icon size={16} />
              <span>풀이 완료</span>
            </div>
          )} */}
          {/* TODO: 밑줄 다섯번 읽는거 제거하기 */}
          <TtsButton
            isActive={isActive}
            text={isSubmitted ? data.explanation : data.question.prompt}
          />
        </div>

        {/* 문제 */}
        {isActive && (
          <div className="animate-in fade-in slide-in-from-right-4 mt-4 flex flex-col duration-500">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-base font-semibold sm:text-lg md:text-xl lg:text-2xl">
                {isSubmitted ? data.explanation : data.question.prompt}
              </span>
            </div>
            <div
              className={cn('flex w-full max-w-md gap-2')}
              onClick={(e) => e.stopPropagation()}
            >
              {isSubmitted ? (
                <span className="text-xl font-bold opacity-90">
                  {data.userAnswer}
                </span>
              ) : (
                <QuizInputForm onSubmit={handleQuizSubmit} />
              )}
            </div>
          </div>
        )}
      </div>

      {/* 이미지 */}
      <Image
        src={QuizImage}
        alt="Quiz Background"
        width={180}
        height={180}
        className={cn(
          'absolute right-0 bottom-0 transition-all duration-500 max-lg:hidden',
          isActive
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-2 scale-95 opacity-60'
        )}
      />
    </div>
  )
}
