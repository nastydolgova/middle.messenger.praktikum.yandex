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
        const response: any = await messagesAPI.getToken(activeChat)
        dispatch({ selectChatToken: response.response.token})
        dispatch(connectUserToChat, [action[0], action[1], response.response.token])
    } catch(err) {
        console.log(err)
    }
}

    export const connectUserToChat = async (
        dispatch: Dispatch<AppState>,
        state: AppState,
        action: string[]
    ) => {

    console.log(action)

    let userId = action[0]  
    let chatId = action[1] 
    let token = action[2] 

    const socket = messagesAPI.initSocket(+userId, +chatId, token);
    dispatch({socket})
    socket.onopen = () => {
        console.log('Соединение установлено');
            socket.send(JSON.stringify({
            content: '0',
            type: 'get old',
        }));
    };

    socket.onclose = function(event) {
        if (event.wasClean) {
            alert('Соединение закрыто чисто');
        } else {
            alert('Обрыв соединения'); // 
        }
        alert('Код: ' + event.code + ' причина: ' + event.reason);
    };

    socket.onmessage = function(event) {
        let messages = JSON.parse(event.data).reverse()
        dispatch({ messages: messages})
    };

    socket.onerror = function(error) {
        alert("Ошибка " + error);
        socket.close();
    };
}

export const sendMessage = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: any[],
) => {  
    let message: string = action[0]
    let socket: WebSocket = action[1]
    let mesgs: any[] = action[2]

    socket.send(JSON.stringify({
        content: message,
        type: 'message',
    }));

    socket.onmessage = function(event) {
        let messages = JSON.parse(event.data)
        mesgs.push(messages)
        dispatch({ messages: mesgs})
    };
};