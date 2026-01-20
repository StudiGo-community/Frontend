'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/shared/lib/cn'
import HeaderDropdownMenu from '@/shared/ui/header/HeaderDropdownMenu'
import { Button } from '@/shared/ui/Button'

const navItems = [
  { name: '커뮤니티', href: '/' },
  { name: '실시간 채팅', href: '/chat' },
]

interface HeaderProps {
  isLoggedIn?: boolean
}

const Header = ({ isLoggedIn = false }: HeaderProps) => {
  const pathname = usePathname()

  return (
    <header className="border-brand-gray-100 bg-brand-white sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b px-6">
      <div className="flex items-center gap-12">
        <Link
          href="/"
          className="text-brand-black text-xl font-bold tracking-tighter"
        >
          스터디고
        </Link>

        <nav className="flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'hover:text-brand-black relative flex w-18.5 items-center gap-1 text-sm font-medium transition-colors',
                  isActive
                    ? 'text-brand-black font-bold'
                    : 'text-brand-gray-400'
                )}
              >
                {item.name}
                {isActive && (
                  <span className="bg-brand-black h-1.5 w-1.5 rounded-full" />
                )}
              </Link>
            )
          })}
        </nav>
      </div>

      {isLoggedIn ? (
        <HeaderDropdownMenu />
      ) : (
        <Link href="/auth/login" className="shrink-0">
          <Button size="sm" className="cursor-pointer">
            로그인하기
          </Button>
        </Link>
      )}
    </header>
  )
}

export default Header
