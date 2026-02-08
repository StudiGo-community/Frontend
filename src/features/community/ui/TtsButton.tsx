'use client'

import { Button } from '@/shared/ui/Button'
import { cn } from '@/shared/lib/cn'
import { Volume2 } from 'lucide-react'
import useTts from '@/shared/lib/useTts'

interface TtsButtonProps {
  isActive: boolean
  text: string
}

export default function TtsButton({ isActive, text }: TtsButtonProps) {
  const { speak } = useTts()

  return (
    <Button
      variant="outline"
      size="md"
      className={cn(
        'text-brand-white h-12 w-12 border-none bg-transparent p-0 transition-all duration-500 hover:scale-120 hover:font-extrabold',
        isActive
          ? 'visible opacity-100 delay-200'
          : 'pointer-events-none invisible opacity-0 delay-0 duration-0'
      )}
      onClick={(e) => {
        e.stopPropagation()
        speak(text, 'spanish')
      }}
    >
      <Volume2 size={28} className="size-8" />
    </Button>
  )
}
