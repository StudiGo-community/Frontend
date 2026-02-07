export const chatSocketApi = {
  connect: (roomId: number, accessToken: string) => {
    const url = `wss://${process.env.NEXT_PUBLIC_WS_HOST}/ws/chat/rooms/${roomId}/?token=${accessToken}`

    return new WebSocket(url)
  },
}
