import { Block } from 'core'

import './chat-field.css'

type ChatFieldProps = {
    isPopUpOpen: boolean
    chatId: number
    isOpen?: () => void
}

export class ChatField extends Block<ChatFieldProps> {
    static componentName = 'ChatField'

    constructor(props: ChatFieldProps) {
        super(props);

        this.setProps({
            isPopUpOpen: false,
            isOpen: () => {
                this.props.isPopUpOpen = !this.props.isPopUpOpen
            }
        })
    }
    
    protected render(): string {
        return `
            <section class="chat-field">
                <div class="chat__wrp">
                    <div class="wrp__user">
                        <img class="user__img" src="#" width="34" height="34" alt="Аватар">
                        <p class="user__name"> Вася </p>
                        {{{Button class="user__button btn__events" onClick=isOpen}}}
                        {{#if isPopUpOpen}}
                            <div class="user__popup">
                                {{{UserPopup}}}
                            </div>
                        {{/if}}
                    </div>
                    {{{ WrpMsgs }}}
                    {{{ SendMsg }}}
                <div>
            </section>
        `
    }
}
