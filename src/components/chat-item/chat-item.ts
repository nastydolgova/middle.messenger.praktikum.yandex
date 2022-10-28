import { Block } from 'core'

import './chat-item.css'

interface ChatItemProps {
    chat_avatar: string
    text: string
    time: string
    title: string
    unread_count: number
}

export class ChatItem extends Block<ChatItemProps> {
    static componentName = 'ChatItem'

    constructor(props: ChatItemProps) {
        super({...props})
    }
    protected render(): string {
        return `
            <div class="chats__wrp">
                <div class="chats__item chat btn__events">
                    <img class="chat__img" src="{{chat_avatar}}" width="47" height="47" alt="Аватар">
                    <div class="chat__description">
                        <p class="chat__name"> {{ title }} </p>
                        <p class="chat__last-msg">
                            {{ text }}
                        </p>
                        <span class="chat__last-update">{{ time }}</span>
                        ${ this.props.unread_count == 0 ? '' :`<span class="chat__msg-count"> {{ unread_count }}</span>`}
                    </div>
                </div> 
            </div>
        `
    }
}
