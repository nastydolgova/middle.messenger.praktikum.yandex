import { Block } from 'core'

import './chat-empty.css'

export class ChatEmpty extends Block {
    static componentName = 'ChatEmpty'

    protected render(): string {
        return `
            <p class="chat__empty"> Выберите чат чтобы отправить сообщение </p> 
        `
    }
}
