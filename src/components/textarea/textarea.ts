import { Block } from 'core'

import './textarea.css'

interface TextAreaProps {
    onBlur?: () => void
    name?: string
    placeholder?: string
    rows?: number
    cols?: number
}

export class TextArea extends Block {
    static componentName = 'TextArea'

    constructor({onBlur, ...props}: TextAreaProps) {
        super({...props, events: { blur: onBlur}})
    }

    protected render(): string {
        return `
            <textarea class="sent__field" name="{{name}}" placeholder="{{placeholder}}" rows="{{rows}}" cols="{{cols}}"></textarea>
        `
    }
}

