'use client'

import { cn } from '@/shared/lib/cn'

interface MarketingSectionProps {
  marketingAgree: boolean
  onChangeMarketingAgree: (next: boolean) => void
}

export function MarketingSection({
  marketingAgree,
  onChangeMarketingAgree,
}: MarketingSectionProps) {
  return (
    <div className="mt-12">
      <h2 className="text-brand-black text-base font-bold">선택 정보</h2>
      <div className="bg-brand-gray-200 mt-4 h-px w-full" />

      <div className="mt-6 flex items-start gap-4">
        <label className="flex cursor-pointer items-start gap-3 select-none">
          <div className="text-sm leading-6">
            <p className="text-brand-black font-medium">마케팅 수신 동의</p>
          </div>

          <input
            type="checkbox"
            checked={marketingAgree}
            onChange={(event) => onChangeMarketingAgree(event.target.checked)}
            className={cn(
              'border-brand-gray-300 mt-0.5 ml-2 h-4 w-4 rounded border',
              'accent-brand-main'
            )}
          />

          <div className="text-brand-gray-400 text-sm leading-6">
            <p>
              스터디고 스페셜한 소식을 이메일, 문자, 카카오 알림톡 등 다양한
              채널로 받아봅니다.
            </p>
            <p className="text-brand-gray-300 mt-1 text-xs leading-5">
              ※ 이용약관의 변경이나 관계법령에 따라 회원님께 안내되어야 할 중요
              고지사항은
              <br />
              마케팅 수신 동의와 상관없이 안내될 수 있습니다.
            </p>
          </div>
        </label>
      </div>
    </div>
  )
}
