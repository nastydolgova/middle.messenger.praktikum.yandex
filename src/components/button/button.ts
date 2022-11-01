import { Block } from 'core'

import './button.css'

interface ButtonProps {
    text: string
    class?: string
    onClick: () => void
}

export class Button extends Block {
    static componentName = 'Button'

    constructor({onClick, ...props}: ButtonProps) {
        super({...props, events: {click: onClick}})
    }

    protected render(): string {
        return `
            <button class="{{class}}" type="button">
                {{text}}
                <svg width="3" height="16" viewBox="0 0 3 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="1.5" cy="2" r="1.5" fill="#1E1E1E"/>
                    <circle cx="1.5" cy="8" r="1.5" fill="#1E1E1E"/>
                    <circle cx="1.5" cy="14" r="1.5" fill="#1E1E1E"/>
                </svg>
            </button>
        `
    }
}
