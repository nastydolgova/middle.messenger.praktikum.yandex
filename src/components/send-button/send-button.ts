import Block from '../../utils/Block'

import './send-button.css'

interface SendButtonProps {
    text: string
    onClick: () => void
}

export class SendButton extends Block {
    static componentName = 'SendButton'

    constructor({text, onClick}: SendButtonProps) {
        super({text, events: {click: onClick}})
    }

    protected render(): string {
        return `
            <button class="sent__button sent__button--sent btn__events">
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect y="5.19995" width="11" height="1.6" fill="white"/>
                    <path d="M7 1L11 6L7 11" stroke="white" stroke-width="1.6"/>
                </svg>
            </button>
        `
    }
}
