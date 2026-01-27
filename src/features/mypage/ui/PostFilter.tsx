import { Dropdown } from '@/shared/ui/dropdown/Dropdown'
import { Input } from '@/shared/ui/input'
import ArrayIcon from '@/features/mypage/assets/array-icon.svg'

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

interface PostFilterProps {
  tab: TabType
  onChangeTab: (tab: TabType) => void
  selectedBoard: string
  onChangeBoard: (value: string) => void
  search: string
  onChangeSearch: (value: string) => void
  isLgDown: boolean
}
export default function PostFilter({
  tab,
  onChangeTab,
  selectedBoard,
  onChangeBoard,
  search,
  onChangeSearch,
  isLgDown,
}: PostFilterProps) {
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
        <span className="hidden sm:inline">
          <ArrayIcon className="text-brand-gray-300 h-5 w-auto shrink-0" />
        </span>
        {!isLgDown && (
          <>
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
          </>
        )}
      </div>
    </div>
  )
}
