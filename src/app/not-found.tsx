import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-12 px-4">
      {/* 404 숫자 */}
      <h1 className="text-brand-main text-9xl font-bold">404</h1>

      {/* 메시지 */}
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-brand-gray-500 text-2xl font-semibold">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="text-brand-gray-400">
          요청하신 페이지가 존재하지 않거나 이동되었습니다.
        </p>
      </div>

      {/* 홈으로 돌아가기 버튼 */}
      <Link
        href="/community"
        className="bg-brand-main text-brand-white hover:bg-brand-second rounded-brand-base shadow-brand-sm hover:shadow-brand-md inline-block px-6 py-3 font-medium transition-all"
      >
        홈으로 돌아가기
      </Link>
    </div>
  )
}
