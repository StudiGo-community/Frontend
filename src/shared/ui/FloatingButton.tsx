'use client'

import { Button } from '@/shared/ui/Button'
import { MessageSquareText } from 'lucide-react'

const FloatingButton = () => {
  return (
    <Button
      className="bg-brand-third hover:bg-brand-second fixed right-10 bottom-10 h-auto rounded-full p-4 font-bold text-white transition-all duration-300"
      onClick={() => {
        console.log('FloatingButton clicked')
      }}
    >
      <MessageSquareText className="size-8" />
    </Button>
  )
}

export default FloatingButton
