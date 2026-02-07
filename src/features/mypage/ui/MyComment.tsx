'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar } from '@/shared/ui/Avatar'
import type { SortOption } from '@/features/mypage/ui/PostFilter'
import type { MyCommentItem } from '@/entities/mypage/model/mypage-ui-types'

interface MyCommentProps {
  items?: MyCommentItem[]
  sortBy: SortOption
  checkedMap: Record<string, boolean>
  onToggleOne: (commentId: string) => void
  profileImageSrc: string | null
}

const truncate100 = (text?: string | null) => {
  if (!text) return ''
  return text.length <= 100 ? text : `${text.slice(0, 100)}...`
}

const formatDateTime = (input: string) => {
  const dateObj = new Date(input)
  const yyyy = dateObj.getFullYear()
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0')
  const dd = String(dateObj.getDate()).padStart(2, '0')
  const hh = String(dateObj.getHours()).padStart(2, '0')
  const min = String(dateObj.getMinutes()).padStart(2, '0')
  return `${yyyy}.${mm}.${dd} ${hh}:${min}`
}

const MyComment = ({
  items,
  sortBy,
  checkedMap,
  onToggleOne,
  profileImageSrc,
}: MyCommentProps) => {
  const router = useRouter()

  const safeItems = useMemo<MyCommentItem[]>(() => {
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
      {sorted.map((item) => {
        const isDeleted = item.postId === null || item.postTitle === null

        const titleText = isDeleted
          ? '삭제된 게시글 입니다'
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

export default MyComment
