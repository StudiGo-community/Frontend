export const queryKeys = {
  all: ['chat'] as const,
  roomList: () => [...queryKeys.all, 'rooms', 'list'] as const,
  messageList: (roomId: number) =>
    [...queryKeys.all, roomId, 'message', 'list'] as const,
}
