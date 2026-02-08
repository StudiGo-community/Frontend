import { ws } from 'msw'
// import { http, HttpResponse, ws } from 'msw'
// import {
//   CHAT_ROOMS,
//   MESSAGES,
//   SOCKET_MESSAGES,
// } from '@/shared/api/mocks/data/chat-data'

// ---------- 채팅방 목록 조회 ----------
// const getChatRoomList = http.get(
//   `${process.env.NEXT_PUBLIC_API_BASE_URL}/chat`,
//   async ({ request }) => {
//     const url = new URL(request.url)
//     const sort = url.searchParams.get('sort') ?? 'desc'

//     if (sort === 'desc')
//       return HttpResponse.json({
//         rooms: CHAT_ROOMS.sort(
//           ({ last_message_at: a }, { last_message_at: b }) =>
//             new Date(b).getTime() - new Date(a).getTime()
//         ),
//       })
//     if (sort === 'asc')
//       return HttpResponse.json({
//         rooms: CHAT_ROOMS.sort(
//           ({ last_message_at: a }, { last_message_at: b }) =>
//             new Date(a).getTime() - new Date(b).getTime()
//         ),
//       })
//     // await new Promise(() => setTimeout(() => {}, 30000)).then(() => {
//     //   return HttpResponse.json({ rooms: CHAT_ROOMS })
//     // })
//     // return HttpResponse.json(
//     //   { detail: '인증정보가 유효하지 않습니다.' },
//     //   { status: 401 }
//     // )
//   }
// )

// ---------- 채팅방 입장 ----------
// const enterChatRoom = http.post<{ roomId?: string }>(
//   `${process.env.NEXT_PUBLIC_API_BASE_URL}/chat/:roomId`,
//   async ({ params }) => {
//     const { roomId } = params
//     const parsedRoomId = Number(roomId)

//     return await new Promise((resolve) => setTimeout(resolve, 3000)).then(() =>
//       HttpResponse.json({
//         message: '채팅방에 입장했습니다.',
//         room: {
//           id: parsedRoomId,
//           name: CHAT_ROOMS.find((room) => room.id === parsedRoomId)?.name,
//         },
//       })
//     )
//     // if ([1, 2, 3, 4].includes(parsedRoomId ?? '')) {
//     //   return HttpResponse.json({
//     //     message: '채팅방에 입장했습니다.',
//     //     room: {
//     //       id: parsedRoomId,
//     //       name: CHAT_ROOMS.find((room) => room.id === parsedRoomId)?.name,
//     //     },
//     //   })
//     // }
//     // return HttpResponse.json(
//     //   { detail: '채팅방을 찾을 수 없습니다.' },
//     //   { status: 404 }
//     // )
//   }
// )

// ---------- 채팅 메세지 조회 ----------
// const getChatMessageList = http.get(
//   `${process.env.NEXT_PUBLIC_API_BASE_URL}/chat/:roomId/messages`,
//   async ({ params, request }) => {
//     const { roomId } = params

//     const url = new URL(request.url)
//     const size = url.searchParams.get('size') ?? 50
//     const parsedSize = Number(size)
//     const cursor = url.searchParams.get('cursor') ?? 1
//     const parsedCursor = Number(cursor)

//     const startIndex = (parsedCursor - 1) * parsedSize
//     const endIndex = startIndex + parsedSize
//     const hasMore = endIndex < MESSAGES.length

//     return HttpResponse.json({
//       room_id: Number(roomId),
//       messages: MESSAGES.slice(startIndex, endIndex),
//       next_cursor: hasMore ? parsedCursor + 1 : null,
//       has_more: hasMore,
//     })
//     // await new Promise(() => setTimeout(() => {}, 30000)).then(() => {
//     //   return HttpResponse.json({ rooms: CHAT_ROOMS })
//     // })
//     // return HttpResponse.json(
//     //   { detail: '채팅 이용이 제한된 사용자입니다.' },
//     //   { status: 403 }
//     // )
//     // return HttpResponse.json({
//     //   room_id: Number(roomId),
//     //   messages: [],
//     //   next_cursor: null,
//     //   has_more: false,
//     // })
//   }
// )

// ---------- 메세지 전송 ----------
// const sendChatMessage = http.post(
//   `${process.env.NEXT_PUBLIC_API_BASE_URL}/chat/:roomId/messages`,
//   async ({ params, request }) => {
//     const { content } = (await request.json()) as { content: string }
//     const { roomId } = params

//     return HttpResponse.json({
//       message: {
//         id: new Date().getTime(),
//         room_id: Number(roomId),
//         sender_id: 1,
//         content: String(content),
//         status: 'SENT',
//         created_at: new Date().toISOString(),
//       },
//     })
//     // return HttpResponse.json(
//     //   { detail: `content: ${content}, room: ${roomId}` },
//     //   { status: 400 }
//     // )
//   }
// )

// ---------- 채팅방 퇴장 ----------
// const exitChatRoom = http.post(
//   `${process.env.NEXT_PUBLIC_API_BASE_URL}/chat/:roomId/exit`,
//   ({ params }) => {
//     const { roomId } = params
//     const parsedRoomId = Number(roomId)

//     if (![1, 2, 3, 4].includes(parsedRoomId))
//       return HttpResponse.json(
//         { detail: '채팅방을 찾을 수 없습니다.' },
//         { status: 404 }
//       )
//     return HttpResponse.json({ message: '채팅방에서 퇴장했습니다.' })
//   }
// )

// ---------- 채팅 웹소켓 이벤트 수신 ----------
const url = new RegExp(
  `wss://${process.env.NEXT_PUBLIC_WS_HOST}/ws/chat/rooms/\\d+.*`
)
const chat = ws.link(url)

const chatSocketHandlers = [
  chat.addEventListener('connection', async ({ client }) => {
    // 웹소켓 연결 성공
    const roomId = Number(client.url.pathname.split('/').at(-2))

    console.log('✨ 웹소켓 연결 완료!')
    client.send(
      JSON.stringify({ type: 'system', message: 'connected', room_id: roomId })
    )

    // 클라이언트 이벤트 수신
    client.addEventListener('message', async (event) => {
      const data = JSON.parse(event.data as string)
      const message = data.message
      const payload = JSON.stringify({
        type: 'NEW_MESSAGE',
        message: {
          id: message.id,
          sender_user_id: message.senderUserId,
          sender: {
            id: message.sender.id,
            nickname: message.sender.nickname,
            profile_image_url: message.sender.profileImageUrl,
          },
          ko_content: message.koContent,
          es_content: message.esContent,
          status: message.status,
          created_at: new Date(message.createdAt).toISOString(),
        },
      })

      // 메세지 브로드캐스트
      chat.broadcast(payload)
    })

    // // 관리자가 메세지 삭제
    // await new Promise((resolve) => setTimeout(resolve, 1000)).then(() =>
    //   client.send(
    //     JSON.stringify({
    //       type: 'MESSAGE_DELETED',
    //       room_id: roomId,
    //       message_id: 104,
    //     })
    //   )
    // ),

    // 웹소켓 연결 종료
    client.addEventListener('close', () => {
      console.log('✨ 웹소켓 연결 종료!')
    })
  }),
]

const chatHandlers = [
  //   getChatRoomList,
  //   enterChatRoom,
  //   getChatMessageList,
  //   sendChatMessage,
  //   exitChatRoom,
  ...chatSocketHandlers,
]

export { chatHandlers }
