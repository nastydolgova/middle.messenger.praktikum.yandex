import { validateForm, ValidateType } from 'helpers/validateForm'
import Block from '../../utils/Block'
import './controlledInput.css'

interface ControlledInputProps {
    onInput?: () => void
    onFocus?: () => void
    type?: 'text' | 'password' | 'email'
    placeholder?: string
    value?: string
    error?: string
    name?: string
    label?: string
    readonly?: string
}

export class ControlledInput extends Block {

    static componentName = 'ControlledInput'

    constructor(props: ControlledInputProps) {
    super({
            ...props, 
            onBlur:(e:FocusEvent) => {
                let atr = `input[name="${this.props.name}"]`
                const inputEl = this.element?.querySelector(atr) as HTMLInputElement
                const error = validateForm([{type: inputEl.name, value: inputEl.value}])
                this.refs.errorRef.setProps({text: error})
            }
        })
    }

    protected render(): string {
        return `
            <div class="controller-input">
                <label class="form__label">
                    {{label}}
                    {{{Input 
                        name="{{name}}"
                        type="{{type}}" 
                        placeholder="{{placeholder}}"
                        onFocus=onFocus
                        onInput=onInput
                        onBlur=onBlur
                        readonly=readonly
                        value=value
                    }}}
                </label>
                {{{ErrorComponent ref="errorRef" text=error}}}
            </div>
        `
    }
}
