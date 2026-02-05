import { useEffect, useRef, useState } from 'react'
import { Dropdown } from '@/shared/ui/dropdown/Dropdown'
import { Input } from '@/shared/ui/input'
import ArrayIcon from '@/features/mypage/assets/array-icon.svg'

export type SortOption = 'latest' | 'oldest'
type TabType = 'post' | 'comment' | 'like'

interface TabButtonProps {
  active: boolean
  children: React.ReactNode
  onClick: () => void
}

function TabButton({ active, children, onClick }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'cursor-pointer pb-4 text-sm font-bold',
        active
          ? 'text-brand-black'
          : 'text-brand-gray-400 hover:text-brand-black',
      ].join(' ')}
    >
      <span className={active ? 'border-brand-black border-b-2 pb-4' : ''}>
        {children}
      </span>
    </button>
  )
}

interface PostFilterProps {
  tab: TabType
  onChangeTab: (tab: TabType) => void
  selectedBoard: string
  onChangeBoard: (value: string) => void
  search: string
  onChangeSearch: (value: string) => void

  sortBy: SortOption
  onChangeSortBy: (value: SortOption) => void
}

export default function PostFilter({
  tab,
  onChangeTab,
  selectedBoard,
  onChangeBoard,
  search,
  onChangeSearch,
  sortBy,
  onChangeSortBy,
}: PostFilterProps) {
  const [isSortOpen, setIsSortOpen] = useState(false)
  const sortRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onMouseDown = (e: MouseEvent) => {
      if (!sortRef.current) return
      if (sortRef.current.contains(e.target as Node)) return
      setIsSortOpen(false)
    }

    if (isSortOpen) document.addEventListener('mousedown', onMouseDown)
    return () => document.removeEventListener('mousedown', onMouseDown)
  }, [isSortOpen])

  return (
    <div className="flex w-full items-end justify-between">
      <div className="flex gap-8">
        <TabButton active={tab === 'post'} onClick={() => onChangeTab('post')}>
          <span className="text-lg">내 게시글</span>
        </TabButton>
        <TabButton
          active={tab === 'comment'}
          onClick={() => onChangeTab('comment')}
        >
          <span className="text-lg">내 댓글</span>
        </TabButton>
        <TabButton active={tab === 'like'} onClick={() => onChangeTab('like')}>
          <span className="text-lg">좋아요</span>
        </TabButton>
      </div>

      <div className="flex items-center gap-6 pb-3">
        <div className="relative hidden sm:inline" ref={sortRef}>
          <button
            type="button"
            onClick={() => setIsSortOpen((prev) => !prev)}
            className="flex h-8 w-8 cursor-pointer items-center justify-center"
            aria-label="정렬 변경"
          >
            <ArrayIcon className="text-brand-gray-300 h-5 w-auto shrink-0" />
          </button>

          {isSortOpen && (
            <div className="border-brand-gray-200 absolute top-9 right-0 z-10 w-28 overflow-hidden rounded-md border bg-white shadow-md">
              <button
                type="button"
                onClick={() => {
                  onChangeSortBy('latest')
                  setIsSortOpen(false)
                }}
                className={[
                  'hover:bg-brand-gray-100 w-full cursor-pointer px-3 py-2 text-left text-sm',
                  sortBy === 'latest'
                    ? 'text-brand-black'
                    : 'text-brand-gray-500',
                ].join(' ')}
              >
                최신순
              </button>
              <button
                type="button"
                onClick={() => {
                  onChangeSortBy('oldest')
                  setIsSortOpen(false)
                }}
                className={[
                  'hover:bg-brand-gray-100 w-full cursor-pointer px-3 py-2 text-left text-sm',
                  sortBy === 'oldest'
                    ? 'text-brand-black'
                    : 'text-brand-gray-500',
                ].join(' ')}
              >
                오래된순
              </button>
            </div>
          )}
        </div>

        <div className="hidden items-center gap-6 lg:flex">
          <Dropdown value={selectedBoard} onValueChange={onChangeBoard}>
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
              value={search}
              onChange={(e) => onChangeSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
