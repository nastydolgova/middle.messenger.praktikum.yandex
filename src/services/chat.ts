import { chatAPI, AddChatData, AddUserData } from 'api/chat'
import type { Dispatch } from 'core'
import { apiHasError } from 'utils'
import { Chat } from 'models/ChatModel'
import { logout } from './auth'
export const getChatList = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
) => {
    dispatch({ isLoading: true })
    try {
        const response: any = await chatAPI.getChatList()
        if (apiHasError(response.response as Chat[]) || apiHasError(response)) {
            //@ts-ignore
            dispatch({ isLoading: false })
            return
        }
        const chatList = response.response.map((chat: Chat) => ({
            id: chat.id,
            title: chat.title,
            chat_avatar: '#',
            unread_count: chat.unread_count,
            time: chat.last_message?.time || '',
            text: chat.last_message?.content || ''
        }))
        dispatch({chatList})
    } catch(err) {
        dispatch(logout)
        console.log(err)
    }
}

export const addChat = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: AddChatData,
) => {
    try{
        dispatch({ isLoading: true })
        const response = await chatAPI.addChat(action)
        if (apiHasError(response)) {
            //@ts-ignore
            dispatch({ isLoading: false })
            return
        }
        dispatch(getChatList)
    } catch(err) {
        dispatch(logout)
        console.log(err)
    }
}

export const addUser = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: AddUserData,
) => {
    dispatch({ isLoading: true })
    try{
        const response = await chatAPI.addUser(action)
        if (apiHasError(response)) {
            //@ts-ignore
            dispatch({ isLoading: false })
            return
        }
        dispatch(getChatList)
    } catch(err) {
        dispatch(logout)
        console.log(err)
    }
}

export const deleteUser = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: AddUserData,
) => {
    dispatch({ isLoading: true })
    try{
        const response = await chatAPI.deleteUser(action)
        if (apiHasError(response)) {
            //@ts-ignore
            dispatch({ isLoading: false })
            return
        }

        dispatch(getChatList)
    } catch(err) {
        dispatch(logout)
        console.log(err)
    }
}