import { HTTP } from 'core/HTTP'

export type AddChatData = {
    title: string;
};

export type AddUserData = {
    users: number[];
    chatId: number;
}

export const chatAPI = {
    getChatList: () => HTTP.get('chats'),
    addChat: (data: AddChatData) => HTTP.post('chats', { data }),
    addUser: (data: AddUserData) => HTTP.put('chats/users', { data }),
    deleteUser: (data: AddUserData) => HTTP.delete('chats/users', { data }),
}
