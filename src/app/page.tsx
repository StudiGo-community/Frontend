import { redirect, RedirectType } from 'next/navigation'

/**
 * [안내]
 * 현재 프로젝트는 별도의 랜딩 페이지 없이 커뮤니티가 메인.
 * 루트 경로('/') 접근 시 '/community'로 리다이렉트되도록 설정했어요.
 *
 * 성능과 SEO를 위해 'next.config.mjs'의 redirects 설정을 우선적으로 따르지만,
 * 구조적 명확성을 위해 이 파일에서도 리다이렉트 흐름을 유지할게요!
 */
export default async function Page() {
  redirect('/community', RedirectType.replace)
}
