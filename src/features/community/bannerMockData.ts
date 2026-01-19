// src/features/community/model/mockData.ts

export interface BannerData {
  id: number
  type: 'quote' | 'quiz'
  title: string
  content: string
  subContent?: string
  audioUrl?: string
  correctAnswer?: string
}

export const MOCK_BANNER_DATA: BannerData[] = [
  {
    id: 1,
    type: 'quote',
    title: '오늘의 문장',
    content: '"Intenta y falla, pero no dejes de intentar"',
    subContent: '도전하고 실패하라, 하지만 도전하는 것을 포기하지 마라',
    audioUrl: '/path/to/audio1.mp3',
  },
  {
    id: 2,
    type: 'quiz',
    title: '오늘의 문제',
    content: '"Intenta y (____), pero no dejes de intentar"',
    correctAnswer: 'falla',
  },
]
