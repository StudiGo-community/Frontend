import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/Pagination'
import { cn } from '../lib/cn'

import { createUrl } from '@/shared/lib/url'

interface UrlPaginationProps {
  totalPages: number
  page: number
  searchParams: Record<string, string | string[] | undefined>
  className?: string
}

export default function UrlPagination({
  totalPages,
  page,
  searchParams,
  className,
}: UrlPaginationProps) {
  // TODO: nuqs 도입시 리팩토링
  const createPageURL = (pageNumber: number | string) => {
    return createUrl('', searchParams, { page: pageNumber })
  }

  const getPageRange = (current: number, total: number) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
    if (current <= 4) return [1, 2, 3, 4, 5, 'ellipsis', total]
    if (current >= total - 3)
      return [1, 'ellipsis', total - 4, total - 3, total - 2, total - 1, total]
    return [1, 'ellipsis', current - 1, current, current + 1, 'ellipsis', total]
  }

  if (totalPages <= 1) return null

  const pages = getPageRange(page, totalPages)

  return (
    <Pagination className={className}>
      <PaginationContent className="space-x-4">
        {/* 이전 */}
        <PaginationItem>
          <PaginationPrevious
            href={createPageURL(Math.max(1, page - 1))}
            aria-disabled={page === 1}
            replace={false}
            className={cn(
              'hover:text-brand-main bg-transparent px-1 hover:bg-transparent hover:underline',
              page === 1 ? 'pointer-events-none opacity-50' : ''
            )}
          />
        </PaginationItem>

        {/* 페이지 번호 */}
        {pages.map((p, i) => (
          <PaginationItem key={`${p}-${i}`}>
            {p === 'ellipsis' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href={createPageURL(p)}
                isActive={page === p}
                replace={false}
                className={cn(
                  'hover:text-brand-main bg-transparent px-1 text-base hover:bg-transparent hover:underline',
                  page === p ? 'text-brand-main border-none underline' : ''
                )}
              >
                {p}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* 다음 */}
        <PaginationItem>
          <PaginationNext
            href={createPageURL(Math.min(totalPages, page + 1))}
            aria-disabled={page === totalPages}
            replace={false}
            className={cn(
              'hover:text-brand-main bg-transparent px-1 hover:bg-transparent hover:underline',
              page === totalPages ? 'pointer-events-none opacity-50' : ''
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
