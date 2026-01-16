'use client'

import { Volume2 } from 'lucide-react'
import { cn } from '@/shared/lib/cn'

interface BannerData {
  id: number
  type: 'quote' | 'quiz'
  content: string
  subContent?: string
}

interface QuoteBannerProps {
  data: BannerData
  isActive: boolean
  onClick: () => void
  imageSrc: string
}

export function QuoteBanner({
  data,
  isActive,
  onClick,
  imageSrc,
}: QuoteBannerProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative cursor-pointer overflow-hidden rounded-2xl transition-all duration-500 ease-in-out',
        isActive ? 'flex-[2.5] bg-[#B50000]' : 'flex-1 bg-[#FF766D]'
      )}
    >
      <div
        className={cn(
          'absolute inset-0 bg-bottom-left bg-no-repeat transition-all duration-500',
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
        <div className="absolute inset-0 bg-[#FF766D]/30 backdrop-blur-[0.5px]" />
      )}

      <div className="relative z-10 flex h-full flex-col justify-start p-6 text-white">
        <div
          className={cn(
            'flex flex-col transition-all duration-500',
            isActive ? 'ml-52' : 'ml-39'
          )}
        >
          <div className="mb-2 flex items-center text-2xl leading-none font-bold">
            오늘의 문장 {isActive ? '' : '〉'}
          </div>
        </div>

        {isActive && (
          <div className="animate-in fade-in slide-in-from-left-4 mt-6 ml-52 duration-500">
            <div className="mb-4 flex items-center gap-3">
              <h2 className="text-2xl font-black italic">{data.content}</h2>
              <Volume2 size={28} className="cursor-pointer hover:opacity-80" />
            </div>
            <p className="text-xl font-bold opacity-90">{data.subContent}</p>
          </div>
        )}
      </div>
    </div>
  )
}
