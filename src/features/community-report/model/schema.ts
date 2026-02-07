import z from 'zod'
import { REPORT_REASON_MAX_LENGTH } from '@/entities/post/model/constants'

// 요청
export const ReportFormSchema = z.object({
  reason: z
    .string()
    .min(1, '신고 사유를 입력해주세요.')
    .max(
      REPORT_REASON_MAX_LENGTH,
      `신고 사유는 ${REPORT_REASON_MAX_LENGTH}자 이내로 입력해주세요.`
    ),
})

export type ReportForm = z.infer<typeof ReportFormSchema>

// 응답
// 베이스
export const ReportResponseBaseSchema = z.object({
  report_id: z.number().int().positive(),
  reason: z.string(),
  status: z.enum(['RECEIVED', 'PENDING', 'RESOLVED', 'REJECTED']), // 명세서와 달라서 일단 이렇게...
  created_at: z.string(),
})

// 게시글
export const PostReportResponseSchema = ReportResponseBaseSchema.extend({
  post_id: z.number().int().positive(),
}).transform((report) => ({
  reportId: report.report_id,
  postId: report.post_id,
  reason: report.reason,
  status: report.status,
  createdAt: new Date(report.created_at),
}))

export type PostReportResponse = z.infer<typeof PostReportResponseSchema>

// 댓글
export const CommentReportResponseSchema = ReportResponseBaseSchema.extend({
  comment_id: z.number().int().positive(),
}).transform((report) => ({
  reportId: report.report_id,
  commentId: report.comment_id,
  reason: report.reason,
  status: report.status,
  createdAt: new Date(report.created_at),
}))

export type CommentReportResponse = z.infer<typeof CommentReportResponseSchema>
