'use client'
import MenuIcon from '@/features/mypage/assets/menu-icon.svg'

import Image from 'next/image'
import { useMemo, useState } from 'react'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/input'
import { Dropdown } from '@/shared/ui/dropdown/Dropdown'
import { Pagination } from '@/shared/ui/Pagination'
import ArrayIcon from '@/features/mypage/assets/array-icon.svg'
import HeartIcon from '@/features/mypage/assets/heart-icon.svg'
import CommentIcon from '@/features/mypage/assets/comment-icon.svg'
import { Avatar } from '@/shared/ui/Avatar'

type TabType = 'post' | 'comment' | 'like'

type TimelineItem = {
  date: string
  day: string
  status: 'done' | 'fail' | 'go' | 'upcoming'
}

function PinProfile() {
  return (
    <div className="relative flex flex-col items-center">
      <div className="border-brand-green bg-brand-white shadow-brand-md relative flex h-28 w-28 items-center justify-center rounded-full border-4">
        <div className="absolute inset-2 overflow-hidden rounded-full">
          <Image
            src="/images/profiles/default-1.webp"
            alt="profile"
            fill
            sizes="112px"
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div className="border-t-brand-green -mt-0.5 h-0 w-0 border-t-18 border-r-12 border-l-12 border-r-transparent border-l-transparent" />
    </div>
  )
}

type BalloonProps = {
  children: React.ReactNode
  variant?: 'default' | 'green'
  tail?: 'left' | 'right'
  className?: string
}

function Balloon({
  children,
  variant = 'default',
  tail = 'left',
  className = '',
}: BalloonProps) {
  const isGreen = variant === 'green'
  const tailLeft = tail === 'left'
  return (
    <div
      className={`relative z-10 inline-block max-w-xs min-w-45 rounded-2xl px-8 py-5 ${
        isGreen
          ? 'bg-brand-green text-white shadow-lg'
          : 'bg-brand-white shadow-lg'
      } ${className}`}
    >
      {tailLeft ? (
        <>
          <div
            className={
              `absolute top-[28%] -left-4 z-0 h-0 w-0 border-y-16 border-r-24 border-y-transparent ` +
              (isGreen ? 'border-r-brand-green' : 'border-r-brand-white')
            }
          />
          {!isGreen && (
            <div className="absolute top-[28%] -left-1 z-10 h-8 w-3 rounded-l-xl bg-white" />
          )}
        </>
      ) : (
        <>
          <div
            className={
              `absolute top-[28%] -right-4 z-0 h-0 w-0 border-y-16 border-l-24 border-y-transparent ` +
              (isGreen ? 'border-l-brand-green' : 'border-l-brand-white')
            }
          />
          {!isGreen && (
            <div className="absolute top-[28%] -right-1 z-10 h-8 w-3 rounded-r-xl bg-white" />
          )}
        </>
      )}
      {children}
    </div>
  )
}

export default function MyPage() {
  const [tab, setTab] = useState<TabType>('post')
  const [page, setPage] = useState(1)
  const [selectedBoard, setSelectedBoard] = useState('')

  const timeline = useMemo<TimelineItem[]>(
    () => [
      { date: '01.08', day: '목', status: 'done' },
      { date: '01.09', day: '금', status: 'done' },
      { date: '01.10', day: '토', status: 'fail' },
      { date: '01.11', day: '일', status: 'go' },
      { date: '01.12', day: '월', status: 'upcoming' },
      { date: '01.13', day: '화', status: 'upcoming' },
      { date: '01.14', day: '수', status: 'upcoming' },
    ],
    []
  )

  return (
    <div className="bg-brand-white min-h-screen">
      <section className="pt-10">
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6">
          <div className="mb-10 ml-8 flex w-full flex-row items-center justify-start">
            <div className="px-8">
              <Button variant="secondary" size="md" className="w-40">
                내 정보 수정
              </Button>
            </div>
            <div className="flex flex-col items-end px-8">
              <h2 className="text-brand-black text-3xl leading-none font-black">
                Fortes42
              </h2>
              <p className="text-brand-gray-400 mt-3 text-base">
                fortelsv42@gmail.com
              </p>
              <p className="text-brand-gray-300 mt-1 text-xs">
                최초 가입일&nbsp;&nbsp;2026.01.08
              </p>
            </div>
            <div className="flex flex-col items-center px-8">
              <PinProfile />
            </div>
            <div className="flex flex-col items-start px-8">
              <Balloon tail="left" className="mb-2 w-[320px]">
                <div className="text-brand-black text-base font-bold">
                  오늘도 힘내봐요!
                </div>
                <div className="text-brand-gray-400 mt-1 text-sm">
                  Hazlo lo mejor que puedas hoy también
                </div>
              </Balloon>
              <Balloon variant="green" tail="right" className="mt-2 ml-24 w-45">
                <div className="font-bold">STUDY GO !</div>
              </Balloon>
            </div>
          </div>
          <div className="border-brand-gray-200 w-full pb-10">
            <div className="mx-auto max-w-6xl px-6">
              <Timeline items={timeline} />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-10">
        <div className="flex items-center justify-between">
          <h1 className="text-brand-black text-2xl font-black">마이페이지</h1>
          <MenuIcon width={4} height={27} className="ml-2 block" />
        </div>

        <div className="border-brand-gray-200 relative mt-6 border-b">
          <div className="flex items-end justify-between">
            <div className="flex gap-8">
              <TabButton active={tab === 'post'} onClick={() => setTab('post')}>
                <span className="text-lg">내 게시글</span>
              </TabButton>
              <TabButton
                active={tab === 'comment'}
                onClick={() => setTab('comment')}
              >
                <span className="text-lg">내 댓글</span>
              </TabButton>
              <TabButton active={tab === 'like'} onClick={() => setTab('like')}>
                <span className="text-lg">좋아요</span>
              </TabButton>
            </div>
            <div className="flex items-center gap-6 pb-3">
              <ArrayIcon className="text-brand-gray-300 h-5 w-auto shrink-0" />
              <Dropdown value={selectedBoard} onValueChange={setSelectedBoard}>
                <Dropdown.Trigger size="md" className="w-60">
                  <Dropdown.Value placeholder="게시판을 선택해 주세요." />
                </Dropdown.Trigger>
                <Dropdown.Content>
                  <Dropdown.Item value="popular">인기게시판</Dropdown.Item>
                  <Dropdown.Item value="recruit">모집 게시판</Dropdown.Item>
                  <Dropdown.Item value="study">학습 게시판</Dropdown.Item>
                  <Dropdown.Item value="free">자유 게시판</Dropdown.Item>
                </Dropdown.Content>
              </Dropdown>
              <div className="relative flex w-[320px] items-center">
                <Input
                  type="search"
                  placeholder="검색어 입력"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <div>
            {Array.from({ length: 10 }).map((_, idx) => (
              <PostRow key={idx} />
            ))}
          </div>
        </div>

        <div className="border-brand-gray-200 border-b" />
        <div className="my-14 flex justify-center">
          <Pagination page={page} totalPages={10} onChangePage={setPage} />
        </div>
      </section>
    </div>
  )
}

function PostRow() {
  return (
    <div className="py-6">
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
          <div className="bg-brand-gray-100 relative h-30 w-30 shrink-0 overflow-hidden rounded-lg">
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
  )
}

function TabButton({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        'pb-4 text-sm font-bold ' +
        (active
          ? 'text-brand-black'
          : 'text-brand-gray-400 hover:text-brand-black')
      }
    >
      <span className={active ? 'border-brand-black border-b-2 pb-4' : ''}>
        {children}
      </span>
    </button>
  )
}

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="relative">
      <div className="absolute top-4 right-0 left-0 flex items-center">
        <span className="text-brand-gray-200 text-3xl leading-none">‹</span>
        <div className="bg-brand-gray-200 mx-6 h-px flex-1" />
        <span className="text-brand-gray-200 text-3xl leading-none">›</span>
      </div>
      <div className="relative flex items-center justify-between px-10">
        {items.map((it) => (
          <div key={it.date} className="flex w-24 flex-col items-center">
            <TimelineDot status={it.status} />
            <div className="mt-3 text-center">
              <p
                className={
                  it.status === 'go'
                    ? 'text-brand-black text-sm font-bold'
                    : 'text-brand-gray-400 text-xs'
                }
              >
                {it.date}. {it.day}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TimelineDot({ status }: { status: TimelineItem['status'] }) {
  if (status === 'done') {
    return (
      <div className="bg-brand-green text-brand-white shadow-brand-sm border-brand-green flex h-11 w-11 items-center justify-center rounded-full border-2">
        <span className="text-base font-black">✓</span>
      </div>
    )
  }
  if (status === 'fail') {
    return (
      <div className="bg-brand-gray-100 text-brand-main shadow-brand-sm border-brand-gray-100 flex h-11 w-11 items-center justify-center rounded-full border-2">
        <span className="text-base font-black">!</span>
      </div>
    )
  }
  if (status === 'go') {
    return (
      <div className="border-brand-green bg-brand-white shadow-brand-sm grid h-14 w-14 place-items-center rounded-full border-4">
        <span className="text-brand-green text-base font-black">GO</span>
      </div>
    )
  }
  return (
    <div className="border-brand-gray-200 bg-brand-white flex h-11 w-11 items-center justify-center rounded-full border-2 border-dashed" />
  )
}
