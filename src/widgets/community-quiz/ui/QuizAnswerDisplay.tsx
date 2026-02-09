'use client'

import { cn } from '@/shared/lib/cn'

interface QuizAnswerDisplayProps {
  answer: string
  isCorrect: boolean
}

export function QuizAnswerDisplay({
  answer,
  isCorrect,
}: QuizAnswerDisplayProps) {
  return (
    <div className="flex w-full items-center gap-4">
      <div className="bg-brand-white flex h-10 w-full items-center justify-center rounded-lg">
        <span
          className={cn(
            'text-lg font-semibold text-shadow-none',
            isCorrect ? 'text-brand-green' : 'text-brand-main'
          )}
        >
          {answer}
        </span>
      </div>

      <div className="flex h-10 shrink-0 items-center justify-center rounded-lg border-2 border-white bg-transparent px-6 font-bold text-white max-sm:px-2">
        완료
      </div>
    </div>
  )
}
