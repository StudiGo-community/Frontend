import * as React from 'react'
import { cn } from '@/shared/lib/cn'
import { Button } from '@/shared/ui/Button'
import DoubleLeftIcon from '@/shared/ui/assets/pagination/double-left-icon.svg'
import DoubleRightIcon from '@/shared/ui/assets/pagination/double-right-icon.svg'
import LeftIcon from '@/shared/ui/assets/pagination/left-icon.svg'
import RightIcon from '@/shared/ui/assets/pagination/right-icon.svg'

interface PaginationBarProps {
  page: number
  totalPages: number
  onChangePage: (page: number) => void
  className?: string
}

// 페이지 효시 범위 계산(최대 7개, '...' 포함)
const Pagination = ({
  page,
  totalPages,
  onChangePage,
  className,
}: PaginationBarProps) => {
  const getPageRange = (
    current: number,
    total: number
  ): (number | 'ellipsis')[] => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
    if (current <= 4) return [1, 2, 3, 4, 5, 'ellipsis', total]
    if (current >= total - 3)
      return [1, 'ellipsis', total - 4, total - 3, total - 2, total - 1, total]
    return [1, 'ellipsis', current - 1, current, current + 1, 'ellipsis', total]
  }

  const tokens = React.useMemo(
    () => getPageRange(page, totalPages),
    [page, totalPages]
  )

  if (totalPages <= 1) return null

  // 공통 컴포넌트 버튼 스타일 제거 및 페이지네이션 기준으로 조정
  const baseBtn =
    'bg-transparent p-0 shadow-none hover:bg-transparent rounded-none grid h-8 place-items-center'

  // 아이콘 간격 조절
  const iconNear = 'w-6'
  const iconFar = 'w-7'

  // 버튼 내부에서 강제로 사이즈 4가 되어 클래스를 명시적으로 지정
  const iconSingleClass = 'block size-2.5 shrink-0'
  const iconDoubleClass = 'block size-3 shrink-0'

  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
    >
      <ul className="flex items-center gap-0">
        <li className="flex h-8 items-center">
          {/* 맨 처음으로 이동 */}
          <Button
            type="button"
            variant="ghost"
            className={cn(baseBtn, iconNear, 'text-brand-gray-200')}
            onClick={() => onChangePage(1)}
            disabled={page === 1}
            aria-label="Go to first page"
          >
            <DoubleLeftIcon className={iconDoubleClass} />
          </Button>

          {/* 이전 페이지로 이동 */}
          <Button
            type="button"
            variant="ghost"
            className={cn(baseBtn, iconFar, 'text-brand-gray-200', '-ml-2')}
            onClick={() => onChangePage(page - 1)}
            disabled={page === 1}
            aria-label="Go to previous page"
          >
            <LeftIcon className={iconSingleClass} />
          </Button>
        </li>

        {/* 페이지 번호 */}
        {tokens.map((t, idx) => (
          <li key={`${t}-${idx}`} className="flex h-8 items-center">
            {t === 'ellipsis' ? (
              <span className="text-brand-gray-500 grid h-8 w-6 place-items-center text-base leading-none">
                …
              </span>
            ) : (
              <Button
                type="button"
                variant="ghost"
                onClick={() => onChangePage(t as number)}
                className={cn(
                  baseBtn,
                  'w-6 text-base leading-none font-medium',
                  'text-brand-gray-500 hover:text-brand-main',
                  t === page &&
                    'text-brand-main underline decoration-1 underline-offset-4'
                )}
                aria-current={t === page ? 'page' : undefined}
              >
                {t}
              </Button>
            )}
          </li>
        ))}

        <li className="flex h-8 items-center">
          {/* 다음 페이지로 이동 */}
          <Button
            type="button"
            variant="ghost"
            className={cn(baseBtn, iconFar, 'text-brand-gray-200')}
            onClick={() => onChangePage(page + 1)}
            disabled={page === totalPages}
            aria-label="Go to next page"
          >
            <RightIcon className={iconSingleClass} />
          </Button>

          {/* 맨 끝으로 이동 */}
          <Button
            type="button"
            variant="ghost"
            className={cn(baseBtn, iconNear, 'text-brand-gray-200', '-ml-2')}
            onClick={() => onChangePage(totalPages)}
            disabled={page === totalPages}
            aria-label="Go to last page"
          >
            <DoubleRightIcon className={iconDoubleClass} />
          </Button>
        </li>
      </ul>
    </nav>
  )
}

export { Pagination }
