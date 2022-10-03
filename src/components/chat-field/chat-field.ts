import Block from '../../utils/Block'

import './chat-field.css'

// interface ChatFieldProps {
//     name: string
//   text: string
//   onClick: () => void
// }

export class ChatField extends Block {
    static componentName = 'ChatField'
    
//   constructor(name: ChatFieldProps) {
//     super(name)
//   }

    protected render(): string {
        return `
            <section class="chat-field">
                <div class="chat__wrp">
                    <div class="wrp__user">
                        <img class="user__img" src="#" width="34" height="34" alt="img">
                        <p class="user__name"> Вася </p>
                        <button class="user__button btn__events">
                            <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="1.5" cy="2" r="1.5" fill="#1E1E1E"/>
                                <circle cx="1.5" cy="8" r="1.5" fill="#1E1E1E"/>
                                <circle cx="1.5" cy="14" r="1.5" fill="#1E1E1E"/>
                            </svg>
                        </button>
                        <div class="user__popup hidden">
                            {{{UserPopup}}}
                        </div>
                    </div>
                    {{{ WrpMsgs }}}
                    {{{ SendMsg }}}
                <div>
            </section>
        `
    }
}
