'use client'

import MenuIcon from '@/features/mypage/assets/menu-icon.svg'
import { DropdownMenu } from '@/shared/ui/DropdownMenu'

interface MyPageActionMenuProps {
  label: string
  onClickAction: () => void
}

const MyPageActionMenu = ({ label, onClickAction }: MyPageActionMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label="마이페이지 메뉴"
          className="hover:bg-brand-gray-100 hidden cursor-pointer rounded-full p-1 transition-colors outline-none sm:inline-flex"
        >
          <MenuIcon width={4} height={27} className="ml-2 block" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content
        align="end"
        className="rounded-brand-base border-brand-gray-100 shadow-brand-md w-44 p-2"
      >
        <DropdownMenu.Item
          className="rounded-brand-sm focus:bg-brand-gray-100 text-brand-gray-500 flex cursor-pointer items-center py-2 text-sm"
          onSelect={(e) => {
            e.preventDefault()
            onClickAction()
          }}
        >
          {label}
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}

export default MyPageActionMenu
