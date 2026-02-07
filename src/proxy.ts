import { type NextRequest, NextResponse } from 'next/server'

export const config = {
  matcher: [
    '/community/:id/edit',
    '/community/write',
    '/chat/:roomId',
    '/mypage/:path*',
  ],
}

export function proxy(request: NextRequest) {
  const isLoggedIn = request.cookies.has('access')

  if (isLoggedIn) return NextResponse.next()
  return NextResponse.redirect(new URL('/auth/login', request.url))
}
