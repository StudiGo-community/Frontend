import { z } from 'zod'

export const SortSchema = z.enum(['latest', 'oldest'])
export type Sort = z.infer<typeof SortSchema>

export const PageParamsSchema = z.object({
  page: z.number().int().min(1).default(1),
  size: z.number().int().min(1).max(100).default(10),
  sort: SortSchema.default('latest'),
})
export type PageParams = z.infer<typeof PageParamsSchema>

export const PaginationSchema = z.object({
  page: z.number(),
  size: z.number(),
  totalCount: z.number(),
  totalPages: z.number(),
  hasNext: z.boolean(),
})
export type Pagination = z.infer<typeof PaginationSchema>

export const BulkDeleteBodySchema = z.object({
  ids: z.array(z.number().int()).min(1),
})
export type BulkDeleteBody = z.infer<typeof BulkDeleteBodySchema>
