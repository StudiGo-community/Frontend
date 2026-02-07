import { z } from 'zod'

export const SortSchema = z.enum(['latest', 'oldest'])
export type Sort = z.infer<typeof SortSchema>

export const PageParamsSchema = z.object({
  page: z.number().int().min(1).default(1),
  size: z.number().int().min(1).max(100).default(10),
  sort: SortSchema.default('latest'),
})
export type PageParams = z.infer<typeof PageParamsSchema>

export const PaginationSchema = z
  .object({
    page: z.number().int().min(1).optional().default(1),
    size: z.number().int().min(1).max(100).optional().default(10),
    totalCount: z.number().optional(),
    total_count: z.number().optional(),
    totalPages: z.number().optional(),
    total_pages: z.number().optional(),
    hasNext: z.boolean().optional(),
    has_next: z.boolean().optional(),
  })
  .transform((v) => {
    return {
      page: v.page,
      size: v.size,
      totalCount: v.totalCount ?? v.total_count ?? 0,
      totalPages: v.totalPages ?? v.total_pages ?? 1,
      hasNext: v.hasNext ?? v.has_next ?? false,
    }
  })
export type Pagination = z.infer<typeof PaginationSchema>

export const BulkDeleteBodySchema = z.object({
  ids: z.array(z.number().int()).min(1),
})
export type BulkDeleteBody = z.infer<typeof BulkDeleteBodySchema>
