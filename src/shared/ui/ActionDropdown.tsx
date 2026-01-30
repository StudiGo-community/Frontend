'use client'

import { Button } from '@/shared/ui/Button'
import { DropdownMenu } from '@/shared/ui/DropdownMenu'
import { Ellipsis, Pencil, Share, Trash2 } from 'lucide-react'

// TODO: 인자 어떻게 처리할지 결정하기
interface ActionDropdownProps {
  onEdit?: () => void
  onShare?: () => void
  onDelete?: () => void
}

export default function ActionDropdown({
  onEdit,
  onShare,
  onDelete,
}: ActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="hover:bg-brand-gray-100/30 border-none"
        >
          <Ellipsis />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content
        onCloseAutoFocus={(e) => e.preventDefault()}
        align="end"
      >
        <DropdownMenu.Item
          className="text-brand-gray-500 flex cursor-pointer items-center justify-between py-2"
          onClick={onEdit}
        >
          <span>수정하기</span>
          <Pencil />
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          className="text-brand-gray-500 flex cursor-pointer items-center justify-between py-2"
          onClick={onShare}
        >
          <span>공유하기</span>
          <Share />
        </DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          variant="destructive"
          className="flex cursor-pointer items-center justify-between py-2"
          onClick={onDelete}
        >
          <span>삭제하기</span>
          <Trash2 />
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}
