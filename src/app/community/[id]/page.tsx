import PostStats from '@/entities/post/ui/PostStats'
import Image from 'next/image'

// UI용 예시 데이터
import profile4 from '@/entities/post/model/profile4.jpg'
import profile2 from '@/entities/post/model/profile2.png'
import thumbnail3 from '@/entities/post/model/thumbnail3.jpg'
import { Heart, MessageSquare, Siren } from 'lucide-react'
import { Button } from '@/shared/ui/Button'
import { Textarea } from '@/shared/ui/Textarea'
import UrlPagination from '@/shared/ui/UrlPagination'
import OptionDropdown from './OptionDropdown'

const post = {
  id: 1,
  title: '테스트 제목',
  content:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum aperiam quibusdam rem sapiente recusandae rerum dolore itaque? Laborum tenetur rem ut debitis velit dicta vel sequi, fugit dolores accusamus quis! Assumenda, aperiam! Quod, facilis! Similique libero sequi ex nemo saepe ipsam voluptas, repudiandae asperiores excepturi reprehenderit quis. Reprehenderit eius exercitationem praesentium velit. Mollitia perspiciatis numquam enim cum obcaecati exercitationem tenetur! Similique aut iusto sit delectus cum, excepturi officia odit aspernatur ducimus illum pariatur tenetur consectetur distinctio quod in, animi eius asperiores et ea eaque. Tempora aperiam adipisci pariatur praesentium minus. Iure praesentium officiis vel laborum reiciendis cumque! Adipisci quia aperiam aliquam itaque accusantium accusamus similique sequi, nostrum modi a sed, saepe praesentium quisquam illo voluptates fugit soluta, recusandae repudiandae. Officia. Deserunt voluptatem totam molestias ipsa atque voluptates ex, delectus, corrupti deleniti commodi ea harum eius doloremque possimus rerum quibusdam similique laboriosam consectetur est praesentium. Obcaecati deserunt ipsa dolorem in. Aut!',
  category: 'Free',
  author: {
    id: 10,
    nickname: 'mju',
    profileImageUrl: profile4,
  },
  images: [{ id: 101, url: thumbnail3, order: 1 }],
  likeCount: 12,
  commentCount: 3,
  viewCount: 10,
  isLiked: true,
  createdAt: '2026-01-12T16:00:00+09:00',
  updatedAt: '2026-01-12T16:10:00+09:00',
  comments: [
    {
      id: 501,
      author: {
        id: 20,
        nickname: 'hana1',
        profileImageUrl: profile2,
      },
      content: '댓글 내용1입니다. @mju 태그가 포함될 수 있어요.',
      taggedNicknames: ['mju'],
      createdAt: '2026-01-12T16:10:00+09:00',
    },
    {
      id: 502,
      author: {
        id: 20,
        nickname: 'hana2',
        profileImageUrl: profile4,
      },
      content: '댓글 내용2입니다. @mju 태그가 포함 가능.',
      taggedNicknames: ['mju'],
      createdAt: '2026-01-12T16:10:00+09:00',
    },
    {
      id: 503,
      author: {
        id: 20,
        nickname: 'hana3',
        profileImageUrl: profile2,
      },
      content: '댓글 내용3입니다. @mju 태그가 포함.',
      taggedNicknames: ['mju'],
      createdAt: '2026-01-12T16:10:00+09:00',
    },
  ],
}

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function Page({ params }: PageProps) {
  const { id } = await params
  console.log(id)

  return (
    <>
      {/* 게시글 헤더 */}
      <section className="border-brand-gray-100 space-y-4 border-b-2">
        {/* 제목, 드롭다운 */}
        <div className="flex items-center justify-between">
          <h1 className="text-brand-black text-4xl font-extrabold">
            {post.title}
          </h1>

          {/* TODO: 인자 어떻게 처리할지 결정하기 */}
          <OptionDropdown />
        </div>

        {/* 기타 정보 */}
        <div className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
          {/* 작성자, 시간 */}
          <div className="text-brand-gray-400 flex items-center gap-4 text-base">
            {/* TODO: 아바타 컴포넌트 분리 */}
            {post.author.profileImageUrl ? (
              <Image
                src={post.author.profileImageUrl}
                alt={post.author.nickname}
                width={40}
                height={40}
                className="size-10 shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="bg-brand-gray-200 h-6 w-6 shrink-0 rounded-full" />
            )}
            <div className="flex flex-col gap-1">
              <span className="text-brand-black text-lg font-bold">
                {post.author.nickname}
              </span>
              <span className="text-brand-gray-300 text-sm">
                {post.createdAt}
              </span>
            </div>
          </div>

          {/* 횟수: (조회수, 좋아요, 댓글) */}
          <PostStats
            viewCount={post.viewCount}
            likeCount={post.likeCount}
            commentCount={post.commentCount}
            className="self-end"
          />
        </div>
      </section>

      {/* 게시글 본문 */}
      {/* TODO: 클라이언트 컴포넌트로 분리 (내용 부분은 팁탭 에디터 뷰어) */}
      <section>
        {/* 내용 */}
        <div className="py-8">{post.content}</div>

        {/* 버튼: (좋아요, 신고하기), 댓글 수 */}
        <div className="flex items-end justify-between py-4">
          <div className="flex items-center gap-2">
            {/* TODO: 컴포넌트 분리 */}
            <Button variant="outline" size="sm" className="text-sm">
              {/* isLiked 인 경우엔 fill-brand-third */}
              <Heart size={14} strokeWidth={2} className="text-brand-third" />
              좋아요
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              <Siren size={14} strokeWidth={2} className="text-brand-third" />
              신고하기
            </Button>
          </div>
          <span className="text-brand-gray-400 flex items-center gap-1">
            <MessageSquare size={14} strokeWidth={2} />
            {post.commentCount.toLocaleString()}
          </span>
        </div>
      </section>

      {/* 게시글 댓글 */}
      <section>
        {/* 댓글 목록 */}
        <div className="flex flex-col">
          <ul className="border-brand-gray-100 flex flex-col gap-8 border-y-2 py-8">
            {/* TODO: 컴포넌트 분리 */}
            {post.comments.map((comment) => (
              <li key={comment.id} className="flex justify-between py-2">
                {/* 좌측 */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    {comment.author.profileImageUrl ? (
                      <Image
                        src={comment.author.profileImageUrl}
                        alt={comment.author.nickname}
                        width={24}
                        height={24}
                        className="size-6 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div className="bg-brand-gray-200 h-6 w-6 shrink-0 rounded-full" />
                    )}
                    <span className="text-brand-gray-500 text-base font-bold">
                      {comment.author.nickname}
                    </span>
                  </div>
                  <div>{comment.content}</div>
                  <span className="text-brand-gray-300 text-sm">
                    {comment.createdAt}
                  </span>
                </div>

                {/* 우측 */}
                <div className="flex flex-col items-end justify-between">
                  {/* TODO: 인자 어떻게 처리할지 결정하기 */}
                  <OptionDropdown />

                  <Button variant="outline" size="sm" className="text-sm">
                    {/* isLiked 인 경우엔 fill-brand-third */}
                    <Heart
                      size={14}
                      strokeWidth={2}
                      className="text-brand-third"
                    />
                    좋아요
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <UrlPagination
            totalPages={5}
            page={1}
            searchParams={{}}
            className="py-12"
          />
        </div>

        {/* 댓글 작성 */}
        <div className="flex flex-col gap-4">
          <Textarea placeholder="댓글을 입력해주세요" />
          <div className="flex items-center justify-between gap-2">
            <span className="text-brand-gray-400">0 / 500</span>
            <Button variant="secondary" size="sm" className="px-6 text-sm">
              등록
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
