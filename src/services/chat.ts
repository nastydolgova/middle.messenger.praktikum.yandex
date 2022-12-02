import { chatAPI, AddChatData, AddUserData } from 'api/chat'
import type { Dispatch } from 'core'
import { apiHasError } from 'utils'
import { Chat } from 'models/ChatModel'
import { logout } from './auth'

export const getChatList = async (
    dispatch: Dispatch<AppState>,
    _state: AppState,
) => {
    dispatch({ isLoading: true })
    try {
        const { response } = await chatAPI.getChatList()
        if (apiHasError(response)) {
            dispatch({ isLoading: false })
            return
        }
        //@ts-ignore
        const chatList = response.map((chat: Chat) => ({
            id: chat.id,
            title: chat.title,
            chat_avatar: chat.avatar ? `https://ya-praktikum.tech/api/v2/resources` + chat.avatar : '#',
            unread_count: chat.unread_count,
            time: chat.last_message?.time || '',
            text: chat.last_message?.content || ''
        })) 
        dispatch({chatList})
    } catch(err) {
        console.log(err)
    }
}

export const addChat = async (
    dispatch: Dispatch<AppState>,
    _state: AppState,
    action: AddChatData,
) => {
    try{
        dispatch({ isLoading: true })
        const { response } = await chatAPI.addChat(action)
        if (apiHasError(response)) {
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
    _state: AppState,
    action: AddUserData,
) => {
    dispatch({ isLoading: true })
    try{
        const { response } = await chatAPI.addUser(action)
        if (apiHasError(response)) {
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
    _state: AppState,
    action: AddUserData,
) => {
    dispatch({ isLoading: true })
    try{
        const { response } = await chatAPI.deleteUser(action)
        if (apiHasError(response)) {
            dispatch({ isLoading: false })
            return
        }
        dispatch(getChatList)
    } catch(err) {
        dispatch(logout)
        console.log(err)
    }
}
