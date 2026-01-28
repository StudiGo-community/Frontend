import Image from 'next/image'
import { Avatar } from '@/shared/ui/Avatar'
import HeartIcon from '@/features/mypage/assets/heart-icon.svg'
import CommentIcon from '@/features/mypage/assets/comment-icon.svg'

export default function MyPost() {
  return (
    <div>
      {Array.from({ length: 10 }).map((_, idx) => (
        <div className="py-6" key={idx}>
          <div className="flex items-start gap-4">
            <input type="checkbox" className="mt-2" />
            <div className="flex flex-1 items-start justify-between gap-0">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <Image
                      src="/images/profiles/default-1.webp"
                      alt="author"
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-brand-gray-500 text-xs font-semibold">
                      흑백요리사
                    </span>
                    <div className="text-brand-gray-400 mt-0.5 flex gap-2 text-xs">
                      <span>2026.01.08</span>
                      <span>02:35</span>
                    </div>
                  </div>
                </div>
                <p className="text-brand-black mt-2 truncate text-base font-semibold">
                  조리는 보이가 나타났다... 이제 우승을 곁들인..!
                </p>
                <div className="text-brand-gray-400 mt-3 flex items-center gap-4 text-xs">
                  <span>조회수 1024</span>
                  <span className="flex items-center gap-1">
                    <HeartIcon className="h-5 w-5" /> 337
                  </span>
                  <span className="flex items-center gap-1">
                    <CommentIcon className="h-5 w-5" /> 84
                  </span>
                </div>
              </div>
              <div className="bg-brand-gray-100 relative hidden h-30 w-30 shrink-0 overflow-hidden rounded-lg md:block">
                <Image
                  src="/images/mypage/post-example.png"
                  alt="thumbnail"
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
