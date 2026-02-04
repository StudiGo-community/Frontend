'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar } from '@/shared/ui/Avatar'

export type SortOption = 'latest' | 'oldest'

export type MyCommentItem = {
  commentId: string
  postId: string | null
  postTitle: string | null
  content: string | null
  createdAt: string
}

interface MyCommentProps {
  page: number
  items?: MyCommentItem[]
  pageSize?: number
  sortBy: SortOption
  checkedMap: Record<string, boolean>
  onToggleOne: (commentId: string) => void
  profileImageSrc: string | null
}

const DEFAULT_PAGE_SIZE = 15

function truncate100(text?: string | null) {
  if (!text) return ''
  return text.length <= 100 ? text : `${text.slice(0, 100)}...`
}

function formatDateTime(input: string) {
  const d = new Date(input)
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  const hh = String(d.getHours()).padStart(2, '0')
  const min = String(d.getMinutes()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd} ${hh}:${min}`
}

const MOCK_ITEMS: MyCommentItem[] = Array.from({ length: 15 }).map((_, i) => {
  const deleted = i === 4
  const longTitle =
    '조리는 보이가 나타났다... 이제 우승을 곁들인..! 조리는 보이가 나타났다... 이제 우승을 곁들인..! 조리는 보이가 나타났다... 이제 우승을 곁들인..!'
  return {
    commentId: `c_${i + 1}`,
    postId: deleted ? null : `p_${i + 1}`,
    postTitle: deleted
      ? null
      : i === 0
        ? longTitle
        : '조리는 보이가 나타났다... 이제 우승을 곁들인..!',
    content: 'fortes42 조림 요정 우승 각 떴다! '.repeat(6),
    createdAt: new Date(Date.now() - i * 1000 * 60 * 60 * 6).toISOString(),
  }
})

export default function MyComment({
  page,
  items,
  pageSize = DEFAULT_PAGE_SIZE,
  sortBy,
  checkedMap,
  onToggleOne,
  profileImageSrc,
}: MyCommentProps) {
  const router = useRouter()

  const safeItems = useMemo<MyCommentItem[]>(() => {
    if (items === undefined) return MOCK_ITEMS
    return Array.isArray(items) ? items : []
  }, [items])

  const sorted = useMemo(() => {
    const copied = [...safeItems]
    copied.sort((a, b) => {
      const ta = new Date(a.createdAt).getTime()
      const tb = new Date(b.createdAt).getTime()
      return sortBy === 'latest' ? tb - ta : ta - tb
    })
    return copied
  }, [safeItems, sortBy])

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize
    return sorted.slice(start, start + pageSize)
  }, [sorted, page, pageSize])

  const goDetail = (item: MyCommentItem) => {
    if (item.postId === null) return
    router.push(`/community/${item.postId}#comment-${item.commentId}`)
  }

  if (items !== undefined && Array.isArray(items) && items.length === 0) {
    return (
      <div className="py-14 text-center">
        <p className="text-brand-gray-500 text-sm">작성한 댓글이 없습니다</p>
      </div>
    )
  }

  return (
    <div className="divide-brand-gray-100 border-brand-gray-100 divide-y border-t">
      {paged.map((item) => {
        const isDeleted = item.postId === null || item.postTitle === null

        const titleText = isDeleted
          ? '삭제된 게시글의 댓글입니다'
          : truncate100(item.postTitle)

        const commentText = truncate100(item.content)

        const handleClick = () => {
          if (isDeleted) return
          goDetail(item)
        }

        return (
          <div
            key={item.commentId}
            className={[
              'py-6',
              isDeleted ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
            ].join(' ')}
            onClick={handleClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleClick()
            }}
          >
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                className="mt-1"
                checked={checkedMap[item.commentId] === true}
                onChange={() => onToggleOne(item.commentId)}
                onClick={(e) => e.stopPropagation()}
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    {profileImageSrc ? (
                      <Image
                        src={profileImageSrc}
                        alt="profile"
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        src="/images/profiles/default-1.webp"
                        alt="profile"
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    )}
                  </Avatar>

                  <span className="text-brand-gray-400 text-xs">
                    {formatDateTime(item.createdAt)}
                  </span>
                </div>

                <div className="mt-2 flex min-w-0 flex-col gap-2 md:flex-row md:items-start md:justify-between md:gap-8">
                  <p className="text-brand-black min-w-0 text-base font-semibold md:flex-1 md:truncate">
                    {titleText}
                  </p>

                  <p className="text-brand-gray-400 min-w-0 truncate text-sm md:w-90 md:max-w-sm md:text-right">
                    {commentText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
