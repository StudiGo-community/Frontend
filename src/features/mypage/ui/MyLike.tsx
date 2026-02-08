'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Avatar } from '@/shared/ui/Avatar'
import HeartIcon from '@/features/mypage/assets/heart-icon.svg'
import CommentIcon from '@/features/mypage/assets/comment-icon.svg'
import type { MyPagePostItem } from '@/entities/mypage/model/mypage-ui-types'
import type { SortOption } from '@/features/mypage/ui/PostFilter'

interface MyLikeProps {
  items: MyPagePostItem[]
  sortBy: SortOption
  checkedMap: Record<string, boolean>
  onToggleOne: (id: string) => void
}

const getPostTimeMs = (post: MyPagePostItem): number => {
  const date = post.date.replace(/\./g, '-')
  const time = post.time.length === 5 ? `${post.time}:00` : post.time
  const timestamp = new Date(`${date}T${time}`).getTime()
  return Number.isNaN(timestamp) ? 0 : timestamp
}

const normalizeThumbUrl = (raw: string): string => {
  const url = raw.trim()
  if (!url) return ''

  if (
    url.includes('placehold.co') &&
    !/\.(png|jpe?g|webp|gif)(\?|$)/i.test(url)
  ) {
    return url.replace(/placehold\.co\/(\d+x\d+)(?!\/)/i, 'placehold.co/$1/png')
  }

  return url
}

const isSvgUrl = (url: string): boolean => /\.svg(\?|$)/i.test(url)

const MyLike = ({ items, sortBy, checkedMap, onToggleOne }: MyLikeProps) => {
  const router = useRouter()

  const sortedItems = [...items].sort((a, b) => {
    const ta = getPostTimeMs(a)
    const tb = getPostTimeMs(b)
    return sortBy === 'latest' ? tb - ta : ta - tb
  })

  if (sortedItems.length === 0) {
    return (
      <div className="py-14 text-center">
        <p className="text-brand-gray-500 text-sm">
          좋아요 한 게시글이 없습니다
        </p>
      </div>
    )
  }

  const goDetail = (postId: number) => router.push(`/community/${postId}`)

  return (
    <div>
      {sortedItems.map((post) => {
        const id = String(post.id)

        const rawThumb =
          typeof post.thumbnail === 'string' ? post.thumbnail : ''
        const thumb = normalizeThumbUrl(rawThumb)
        const hasThumb = thumb.length > 0

        return (
          <div
            key={post.id}
            className="cursor-pointer py-6"
            onClick={() => goDetail(post.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && goDetail(post.id)}
          >
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                className="mt-2"
                checked={checkedMap[id] === true}
                onChange={() => onToggleOne(id)}
                onClick={(e) => e.stopPropagation()}
              />

              <div className="flex flex-1 items-start justify-between gap-0">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <Image
                        src={post.avatar}
                        alt="author"
                        fill
                        sizes="32px"
                        className="object-cover"
                      />
                    </Avatar>

                    <div className="flex flex-col">
                      <span className="text-brand-gray-500 text-xs font-semibold">
                        {post.author}
                      </span>
                      <div className="text-brand-gray-400 mt-0.5 flex gap-2 text-xs">
                        <span>{post.date}</span>
                        <span>{post.time}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-brand-black mt-2 truncate text-base font-semibold">
                    {post.title}
                  </p>

                  <div className="text-brand-gray-400 mt-3 flex items-center gap-4 text-xs">
                    <span>조회수 {post.views}</span>
                    <span className="flex items-center gap-1">
                      <HeartIcon className="h-5 w-5" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <CommentIcon className="h-5 w-5" /> {post.comments}
                    </span>
                  </div>
                </div>

                {hasThumb && (
                  <div className="bg-brand-gray-100 relative hidden h-30 w-30 shrink-0 overflow-hidden rounded-lg md:block">
                    {isSvgUrl(thumb) ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={thumb}
                          alt="thumbnail"
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      </>
                    ) : (
                      <Image
                        src={thumb}
                        alt="thumbnail"
                        fill
                        sizes="120px"
                        className="object-cover"
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MyLike
