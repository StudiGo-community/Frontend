'use client'

import { useRouter } from 'next/navigation'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/Button'
import { createUrl } from '@/shared/lib/url'

interface SearchFormProps {
  currentSearchParams: Record<string, string | string[] | undefined>
}

export default function CommunitySearchForm({
  currentSearchParams,
}: SearchFormProps) {
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    console.log(formData)
    const query = formData.get('query') as string

    const newUrl = createUrl('', currentSearchParams, {
      q: query || null, // query 빈 값 -> null -> 파라미터 삭제
      page: 1,
    })

    router.push(newUrl)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex grow items-center justify-end gap-2"
    >
      <Input
        name="query"
        type="search"
        size="sm"
        defaultValue={(currentSearchParams.q as string) || ''}
        placeholder="검색어를 입력하세요"
        className="hover:border-brand-main text-brand-gray-300 hover:text-brand-main max-w-sm"
      />
      <Button
        type="submit"
        className="bg-brand-black h-10 shrink-0 px-4 text-sm font-bold hover:bg-black/80"
      >
        검색
      </Button>
    </form>
  )
}
