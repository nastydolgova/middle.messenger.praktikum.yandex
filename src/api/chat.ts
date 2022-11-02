import { HTTP } from 'core/HTTP'

export type AddChatData = {
    title: string
}

export type AddUserData = {
    users: number[]
    chatId: number
}

export type Response<T> = {
    response: T
}

export const chatAPI = {
    getChatList: (): Response<unknown> | PromiseLike<Response<unknown>> => HTTP.get('chats'),
    addChat: (data: AddChatData): Response<unknown> | PromiseLike<Response<unknown>> => HTTP.post('chats', { data }),
    addUser: (data: AddUserData): Response<unknown> | PromiseLike<Response<unknown>> => HTTP.put('chats/users', { data }),
    deleteUser: (data: AddUserData): Response<unknown> | PromiseLike<Response<unknown>> => HTTP.delete('chats/users', { data }),
}
