export const chatKeys = {
  all: ['chat'] as const,
  roomList: (sort: string) => [...chatKeys.all, 'rooms', 'list', sort] as const,
  messageList: (roomId: number) =>
    [...chatKeys.all, roomId, 'message', 'list'] as const,
}

export const communityKeys = {
  all: ['community'] as const,
  list: () => [...communityKeys.all, 'list'] as const,
  listBy: (filter: object) => [...communityKeys.list(), { filter }] as const,
  post: (postId: number) => [...communityKeys.all, 'post', postId] as const,
  content: (postId: number) =>
    [...communityKeys.post(postId), 'content'] as const,
  comments: (postId: number) =>
    [...communityKeys.post(postId), 'comments'] as const,
}

export const mypageKeys = {
  all: ['mypage'] as const,
  myPostsList: (page: number, size: number, sort: 'latest' | 'oldest') =>
    [...mypageKeys.all, 'posts', 'list', page, size, sort] as const,
  myCommentsList: (page: number, size: number, sort: 'latest' | 'oldest') =>
    [...mypageKeys.all, 'comments', 'list', page, size, sort] as const,
  likedPostsList: (page: number, size: number, sort: 'latest' | 'oldest') =>
    [...mypageKeys.all, 'liked-posts', 'list', page, size, sort] as const,
}
