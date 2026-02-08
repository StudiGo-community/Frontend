'use client'

import { Volume2 } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/shared/lib/cn'
import { Quote } from '@/entities/quiz/model/schema'
import { Button } from '@/shared/ui/Button'
import QuoteImage from '@/features/community/assets/quote-image.png'
import useTts from '@/shared/lib/useTts'

interface QuoteBannerProps {
  data: Quote
  isActive: boolean
  onClick: () => void
}

export function QuoteBanner({ data, isActive, onClick }: QuoteBannerProps) {
  const { speak } = useTts()

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative flex cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-in-out',
        isActive ? 'bg-brand-main flex-[2.5]' : 'bg-brand-second flex-1'
      )}
    >
      {/* 이미지 */}
      <Image
        src={QuoteImage}
        alt="Quote Background"
        width={200}
        height={200}
        className={cn(
          'transition-all duration-500 max-lg:hidden',
          isActive
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-2 scale-95 opacity-60'
        )}
      />

      <div className="relative z-10 flex h-full flex-col justify-start p-6 text-white">
        {/* 제목, tts 버튼 */}
        <div
          className={cn(
            'relative flex transition-all duration-500',
            isActive ? 'justify-between' : ''
          )}
        >
          <span
            className={cn(
              'border-brand-white relative mb-4 flex items-center border-b text-xl font-semibold whitespace-nowrap transition-all duration-500 ease-in-out',
              // 핵심 슬라이딩 로직
              isActive ? 'left-0 translate-x-0' : ''
            )}
          >
            오늘의 문장 {!isActive && '〉'}
          </span>
          <Button
            variant="outline"
            size="md"
            className={cn(
              'text-brand-white h-12 w-12 border-none bg-transparent p-0 transition-all duration-500 hover:scale-120 hover:font-extrabold',
              isActive
                ? 'visible opacity-100 delay-200'
                : 'pointer-events-none invisible opacity-0 delay-0 duration-0'
            )}
            onClick={(e) => {
              e.stopPropagation()
              speak(data.quotes.es, 'spanish')
            }}
          >
            <Volume2 size={28} className="size-8" />
          </Button>
        </div>

        {/* 문장 */}
        {isActive && (
          <div className="animate-in fade-in slide-in-from-left-4 flex flex-col gap-2 duration-500">
            <span className="text-base font-semibold sm:text-lg md:text-xl lg:text-2xl">
              {data.quotes.es}
            </span>
            <span className="text-xl font-medium">{data.quotes.ko}</span>
          </div>
        )}
      </div>
    </div>
  )
}
