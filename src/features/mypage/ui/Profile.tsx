import Image from 'next/image'
import { Button } from '@/shared/ui/Button'
import { useRouter } from 'next/navigation'

function PinProfile() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="border-brand-green bg-brand-white shadow-brand-md relative flex h-28 w-28 items-center justify-center rounded-full border-4 max-lg:h-20 max-lg:w-20">
        <div className="absolute inset-2 overflow-hidden rounded-full max-lg:inset-1.5">
          <Image
            src="/images/profiles/default-1.webp"
            alt="profile"
            fill
            sizes="112px"
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div className="border-t-brand-green -mt-0.5 h-0 w-0 border-t-18 border-r-12 border-l-12 border-r-transparent border-l-transparent max-lg:border-t-12 max-lg:border-r-8 max-lg:border-l-8" />
    </div>
  )
}

function Balloon({
  children,
  variant = 'default',
  tail = 'left',
  className = '',
}: {
  children: React.ReactNode
  variant?: 'default' | 'green'
  tail?: 'left' | 'right'
  className?: string
}) {
  const isGreen = variant === 'green'
  const tailLeft = tail === 'left'
  return (
    <div
      className={`relative z-10 inline-block max-w-xs min-w-45 rounded-2xl px-8 py-5 max-lg:min-w-0 max-lg:rounded-xl max-lg:px-5 max-lg:py-3.5 ${
        isGreen
          ? 'bg-brand-green text-white shadow-lg'
          : 'bg-brand-white shadow-lg'
      } ${className}`}
    >
      {tailLeft ? (
        <>
          <div
            className={
              `absolute top-[28%] -left-4 z-0 h-0 w-0 border-y-16 border-r-24 border-y-transparent max-lg:-left-3 max-lg:border-y-10 max-lg:border-r-16 ` +
              (isGreen ? 'border-r-brand-green' : 'border-r-brand-white')
            }
          />
          {!isGreen && (
            <div className="absolute top-[28%] -left-1 z-10 h-8 w-3 rounded-l-xl bg-white max-lg:h-6 max-lg:w-2" />
          )}
        </>
      ) : (
        <>
          <div
            className={
              `absolute top-[28%] -right-4 z-0 h-0 w-0 border-y-16 border-l-24 border-y-transparent max-lg:-right-3 max-lg:border-y-10 max-lg:border-l-16 ` +
              (isGreen ? 'border-l-brand-green' : 'border-l-brand-white')
            }
          />
          {!isGreen && (
            <div className="absolute top-[28%] -right-1 z-10 h-8 w-3 rounded-r-xl bg-white max-lg:h-6 max-lg:w-2" />
          )}
        </>
      )}
      {children}
    </div>
  )
}

export default function Profile() {
  const router = useRouter()
  return (
    <div className="mb-10 flex w-full flex-row items-center justify-center gap-2 max-lg:gap-5 sm:gap-4 md:gap-8">
      <div className="flex min-w-0 flex-1 justify-end px-2 max-lg:px-5 sm:px-4 md:px-8">
        <div className="flex items-center gap-6 lg:gap-12">
          <Button
            type="button"
            variant="secondary"
            size="md"
            onClick={() => router.push('/mypage/my-information-fix')}
            className="w-28 px-3 py-1.5 text-sm lg:w-40 lg:px-4 lg:py-2 lg:text-base"
          >
            <span className="block">내 정보 수정</span>
          </Button>
          <div className="hidden flex-col items-end leading-tight md:flex">
            <h2 className="text-brand-black text-2xl font-black lg:text-3xl">
              Fortes42
            </h2>
            <p className="text-brand-gray-400 mt-0.5 text-sm lg:text-base">
              fortelsv42@gmail.com
            </p>
            <p className="text-brand-gray-300 mt-0.5 text-[10px] lg:text-xs">
              최초 가입일&nbsp;&nbsp;2026.01.08
            </p>
          </div>
        </div>
      </div>
      <div className="z-10 flex flex-col items-center">
        <PinProfile />
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-start px-2 max-lg:px-5 sm:px-4 md:px-8">
        <div className="hidden md:block">
          <Balloon
            tail="left"
            className="mb-2 w-35 max-lg:w-60 sm:w-45 md:w-55 lg:w-80"
          >
            <div className="text-brand-black text-sm font-bold lg:text-base">
              오늘도 힘내봐요!
            </div>
            <div className="text-brand-gray-400 mt-1 text-xs lg:text-sm">
              Hazlo lo mejor que puedas hoy también
            </div>
          </Balloon>
          <Balloon
            variant="green"
            tail="right"
            className="mt-2 ml-24 w-20 max-lg:ml-16 max-lg:w-32 sm:w-28 md:w-32 lg:w-45"
          >
            <div className="text-sm font-bold lg:text-base">STUDY GO !</div>
          </Balloon>
        </div>
      </div>
    </div>
  )
}
