import Block from '../../utils/Block'

import './button.css'

interface ButtonProps {
    text: string
    onClick: () => void
}

export class Button extends Block {
    static componentName = 'Button'

    constructor({text, onClick}: ButtonProps) {
        super({text, events: {click: onClick}})
    }

    protected render(): string {
        return `
            <button class="form__btn btn__events type="button">{{text}}</button>
        `
    }
}
