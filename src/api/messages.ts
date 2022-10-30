import { HTTP } from 'core/HTTP'
export const messagesAPI = {
    getToken: (data: string) => HTTP.post('chats/token/' + data),
    initSocket: (userId: number, chatId: number, token: string): WebSocket => {
        const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`)
        return socket
    },
}
