export const chatSocketApi = {
  connect: (roomId: number, accessToken: string) => {
    const protocol = window.location.protocol === 'https' ? 'wss' : 'ws'
    const url = `${protocol}://${process.env.NEXT_PUBLIC_WS_HOST}/ws/chat/rooms/${roomId}/?token=${accessToken}`

    return new WebSocket(url)
  },
}
