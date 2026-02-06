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
