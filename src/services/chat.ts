import { chatAPI, AddChatData } from 'api/chat'
import type { Dispatch } from 'core'
import { apiHasError } from 'utils'

export const getChatList = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
) => {
    dispatch({ isLoading: true })

    const response: any = await chatAPI.getChatList()
    if (apiHasError(response)) {
        //@ts-ignore
        dispatch({ isLoading: false })
        return
    }

    const chatList = response.response.map((chat: any) => ({
        id: chat.id,
        title: chat.title,
        chatAvatar: '#',
        unreadCount: chat.unread_count,
        time: chat.last_message?.time || '',
        text: chat.last_message?.content || ''
      }));


    dispatch({chatList})
}

// getAvatarImage(chat.avatar || chat.last_message?.user.avatar || null)

export const addChat = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: AddChatData,
) => {
    dispatch({ isLoading: true })

    const response = await chatAPI.addChat(action)
    if (apiHasError(response)) {
        //@ts-ignore
        dispatch({ isLoading: false })
        return
    }

    dispatch(getChatList)
}