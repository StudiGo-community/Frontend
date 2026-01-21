export const queryKeys = {
  all: ['chat'] as const,
  roomList: () => [...queryKeys.all, 'rooms', 'list'] as const,
}
