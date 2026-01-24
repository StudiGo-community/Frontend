'use client'

import { useFormContext } from 'react-hook-form'
import { PostFormData } from '@/shared/api/schema/postSchema'

export default function TagInput() {
  const { watch, setValue } = useFormContext<PostFormData>()
  const tags = watch('tags') || []

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault()
      const val = e.currentTarget.value.trim()
      if (val && tags.length < 10 && !tags.includes(val)) {
        setValue('tags', [...tags, val])
        e.currentTarget.value = ''
      }
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="bg-brand-gray-100 text-brand-gray-400 flex items-center gap-1 rounded-full px-3 py-1.5 text-sm"
          >
            #{tag}
            <button
              type="button"
              onClick={() =>
                setValue(
                  'tags',
                  tags.filter((t) => t !== tag)
                )
              }
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <input
        onKeyDown={handleKeyDown}
        placeholder="#태그 입력 (최대 10개)"
        className="text-brand-gray-300 w-full bg-transparent text-sm outline-none"
      />
    </div>
  )
}
