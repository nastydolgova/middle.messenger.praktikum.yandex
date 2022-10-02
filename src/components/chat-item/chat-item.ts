import Block from '../../utils/Block'

import './chat-item.css'

// interface ChatItemProps {
//   text: string
//   onClick: () => void
// }

export class ChatItem extends Block {
    static componentName = 'ChatItem'
//   constructor({text, onClick}: ChatItemProps) {
//     super({text, events: {click: onClick}})
//   }

    protected render(): string {
        return `
            <div class="chats__wrp">
                <div class="chats__item chat btn__events">
                    <img class="chat__img" src="#" width="47" height="47" alt="img">
                    <div class="chat__description">
                        <p class="chat__name"> Вася </p>
                        <p class="chat__last-msg">
                            <span class="chat__autor">Вы: </span>
                            Друзья, тратата
                        </p>
                        <span class="chat__last-update">10:49</span>
                        <span class="chat__msg-count">2</span>
                    </div>
                </div> 
            </div>
        `
    }
}
