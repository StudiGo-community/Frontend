'use client'

import Link from 'next/link'
import {
  HeartIcon,
  HistoryIcon,
  HomeIcon,
  LayoutGridIcon,
  LogOutIcon,
  MessageSquareTextIcon,
  SettingsIcon,
  UserIcon,
} from 'lucide-react'
import { DropdownMenu } from '@/shared/ui/DropdownMenu'
import { Avatar } from '@/shared/ui/Avatar'
import { Accordion } from '@/shared/ui/Accordion'
import { useLogoutMutation } from '@/features/auth/logout/hook/useLogoutMutation'

export const HeaderDropdownMenu = () => {
  const { mutate: doLogout } = useLogoutMutation()

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenu.Trigger asChild>
          <button className="hover:bg-brand-gray-100 cursor-pointer rounded-full p-1 transition-colors outline-none">
            <UserIcon className="text-brand-black h-6 w-6" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content
          align="end"
          className="rounded-brand-base border-brand-gray-100 shadow-brand-md w-64 p-2"
        >
          <div className="flex items-center gap-3 p-3">
            <Avatar className="border-brand-green h-10 w-10 border">
              <Avatar.Image src="/images/profile-dog.png" alt="Fortes42" />
              <Avatar.Fallback>F42</Avatar.Fallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-brand-black text-sm font-bold">
                Fortes42
              </span>
              <span className="text-brand-gray-300 text-xs">
                fortes42ex@gmail.com
              </span>
            </div>
          </div>

          <DropdownMenu.Separator className="bg-brand-gray-100" />

          <div className="py-1">
            <DropdownMenu.Item
              asChild
              className="rounded-brand-sm focus:bg-brand-gray-100"
            >
              <Link
                href="/mypage"
                className="text-brand-gray-500 flex w-full items-center gap-3 py-2"
              >
                <HomeIcon className="h-4 w-4" />
                <span className="text-sm">마이페이지로 이동</span>
              </Link>
            </DropdownMenu.Item>

            <DropdownMenu.Item className="rounded-brand-sm focus:bg-brand-gray-100 text-brand-gray-500 flex items-center gap-3 py-2 text-sm">
              <SettingsIcon className="h-4 w-4" />내 정보 수정
            </DropdownMenu.Item>

            <Accordion type="single" collapsible className="w-full">
              <Accordion.Item value="my-activity" className="border-none">
                <Accordion.Trigger className="hover:bg-brand-gray-100 rounded-brand-sm text-brand-gray-500 px-2 py-2 hover:no-underline">
                  <div className="flex items-center gap-3">
                    <HistoryIcon className="h-4 w-4" />
                    <span>내 활동 보기</span>
                  </div>
                </Accordion.Trigger>
                <Accordion.Content className="bg-brand-gray-100/50 rounded-brand-sm mt-1 pb-1">
                  <DropdownMenu.Item className="text-brand-gray-500 flex cursor-pointer items-center gap-3 px-8 py-2 text-sm focus:bg-transparent">
                    <LayoutGridIcon className="h-4 w-4" /> 내 게시글
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="text-brand-gray-500 flex cursor-pointer items-center gap-3 px-8 py-2 text-sm focus:bg-transparent">
                    <MessageSquareTextIcon className="h-4 w-4" /> 내 댓글
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="text-brand-gray-500 flex cursor-pointer items-center gap-3 px-8 py-2 text-sm focus:bg-transparent">
                    <HeartIcon className="h-4 w-4" /> 좋아요
                  </DropdownMenu.Item>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion>
          </div>

          <DropdownMenu.Separator className="bg-brand-gray-100" />

          <DropdownMenu.Item
            className="rounded-brand-sm focus:bg-brand-gray-100 text-brand-black flex items-center gap-3 py-2 text-sm font-medium"
            onSelect={() => doLogout({})}
          >
            <LogOutIcon className="h-4 w-4" />
            로그아웃
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu>
    </div>
  )
}

export default HeaderDropdownMenu
