import { Suspense } from 'react'
import { JoinFunnel } from '@/features/auth-join/ui'

export default function Page() {
  return (
    <main className="bg-brand-white flex min-h-dvh items-center justify-center px-4 py-10 sm:py-14">
      <section className="w-full max-w-sm sm:max-w-md">
        <header className="text-center">
          <h1 className="text-brand-black text-3xl font-bold">StudiGo</h1>
          <p className="text-brand-black mt-2 text-2xl leading-10 font-semibold">
            회원가입
          </p>
        </header>

        <div className="mt-8">
          <Suspense
            fallback={<div className="py-10 text-center">로딩중...</div>}
          >
            <JoinFunnel />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
