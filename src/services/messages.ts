import type { Dispatch } from 'core'
import { messagesAPI } from 'api/messages'

export const getToken = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: string[],
) => {
    dispatch({ isLoading: true })
    try {
        let activeChat = action[1]
        const { response } = await messagesAPI.getToken(activeChat)
        dispatch({ selectChatToken: response.token})
        dispatch(connectUserToChat, [action[0], action[1], response.token])
    } catch(err) {
        console.log(err)
    }
}

    export const connectUserToChat = async (
        dispatch: Dispatch<AppState>,
        state: AppState,
        action: string[]
    ) => {

    const [userId, chatId, token] = action   

    const socket = messagesAPI.initSocket(+userId, +chatId, token)
    dispatch({socket})
    socket.onopen = () => {
        console.log('Соединение установлено')
            socket.send(JSON.stringify({
            content: '0',
            type: 'get old',
        }))
    }

    socket.onclose = function(event) {
        if (event.wasClean) {
            alert('Соединение закрыто чисто')
        } else {
            alert('Обрыв соединения')
        }
    }

    socket.onmessage = function(event) {
        let messages = JSON.parse(event.data).reverse()
        dispatch({ messages: messages})
    }

    socket.onerror = function(error) {
        alert("Ошибка " + error)
        socket.close()
    }
}

export const sendMessage = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: any[],
) => {  
    const [message, socket, mesgs] = action
    socket.send(JSON.stringify({
        content: message,
        type: 'message',
    }))

    socket.onmessage = function(event: any) {
        let messages = JSON.parse(event.data)
        mesgs.push(messages)
        dispatch({ messages: mesgs})
    }
}
