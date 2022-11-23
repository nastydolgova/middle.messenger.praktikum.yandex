import { HTTP } from 'core/HTTP'

export type Response<T> = {
    response: T
}

export const messagesAPI = {
    getToken: (data: string): Response<unknown> | PromiseLike<Response<unknown>> => HTTP.post('chats/token/' + data),
    initSocket: (userId: number, chatId: number, token: string): WebSocket => {
        const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`)
        return socket
    },
}
