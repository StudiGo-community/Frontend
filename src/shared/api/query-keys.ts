export const chatKeys = {
  all: ['chat'] as const,
  roomList: () => [...chatKeys.all, 'rooms', 'list'] as const,
  messageList: (roomId: number) =>
    [...chatKeys.all, roomId, 'message', 'list'] as const,
}
