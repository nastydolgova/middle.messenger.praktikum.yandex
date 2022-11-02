declare global {
    export type Nullable<T> = T | null

    export type Keys<T extends Record<string, unknown>> = keyof T
    export type Values<T extends Record<string, unknown>> = T[Keys<T>]

    export type Indexed = { [key: string]: any }

    export type AppState = {
        appIsInited: boolean
        screen: Screens | null
        isLoading: boolean
        user: User | null
        chatList: []
        messages: []
        socket: null | WebSocket
        selectChatToken: string | null
    }

    export type User = {
        id: number
        login: string
        first_name: string
        second_name: string
        display_name: string
        avatar: string
        phone: string
        email: string
    }

    export type Response<T> = {
        response: T
    }
}

export {}
