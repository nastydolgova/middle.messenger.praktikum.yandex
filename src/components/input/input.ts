import Block from '../../utils/Block'

import './input.css'

interface InputProps {
    onInput?: () => void
    onFocus?: () => void
    onBlur?: () => void
    type?: 'text' | 'password' | 'email'
    name?: string
    readonly?: string
    value?: string
}

export class Input extends Block {
    static componentName = 'Input'

    constructor({onInput, onFocus, onBlur, ...props}: InputProps) {
        super({...props, events: {input: onInput, focus: onFocus, blur: onBlur}})
    }

    protected render(): string {
        return `
            <input  class="form__input" name="{{name}}" type="{{type}}" value={{value}} {{readonly}}>
        `
    }
}

