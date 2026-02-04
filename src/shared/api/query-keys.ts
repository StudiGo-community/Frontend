export const chatKeys = {
  all: ['chat'] as const,
  roomList: (sort: string) => [...chatKeys.all, 'rooms', 'list', sort] as const,
  messageList: (roomId: number) =>
    [...chatKeys.all, roomId, 'message', 'list'] as const,
}

export const postKeys = {
  all: ['posts'] as const,
}
