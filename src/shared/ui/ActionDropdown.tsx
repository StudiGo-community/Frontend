'use client'

import { Button } from '@/shared/ui/Button'
import { DropdownMenu } from '@/shared/ui/DropdownMenu'
import { Ellipsis } from 'lucide-react'

interface ActionDropdownProps {
  children: React.ReactNode
}

export default function ActionDropdown({ children }: ActionDropdownProps) {
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
        {children}
      </DropdownMenu.Content>
    </DropdownMenu>
  )
}
