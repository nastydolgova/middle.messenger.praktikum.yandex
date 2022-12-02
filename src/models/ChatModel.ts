export type Chat = {
    chat_avatar: string
    id: number
    text: string
    time: string
    title: string
    unread_count: number
    last_message?: {
        time: string
        content: string
    }
    avatar?: string
}
