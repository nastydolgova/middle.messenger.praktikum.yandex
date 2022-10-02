import Block from '../../utils/Block'
import { validateForm, ValidateType } from 'helpers/validateForm'
import './form.css'

// interface FormProps {
//   text: string
//   onClick: () => void
// }

export class Form extends Block {
    static componentName = 'Form'

    constructor(){
        super()

        this.setProps({
            error: '',
            loginValue: '',
            passwordValue: '',
            onInput:(e: any) => {
                const inputEl = e.target as HTMLInputElement
                const errorMessage = validateForm([
                {type: ValidateType.Login, value: inputEl.value},
                ])
                //@ts-ignore
                this.refs.loginInputRef.refs.errorRef.setProps({ text: errorMessage})
            },
            onFocus:() => console.log('focus'),
            onSubmit: () => {
                const loginEl = this.element?.querySelector('input[name="login"]') as HTMLInputElement
                const errorMessage = validateForm([
                {type: ValidateType.Login, value: loginEl.value},
                ])
                // @ts-ignore
                this.refs.loginInputRef.refs.errorRef.setProps({ text: errorMessage })
                
            }
        })
    }

    protected render(): string {
        return `
            <form>
            {{{ ControlledInput
                ref="loginInputRef"
                onInput=onInput
                onFocus=onFocus
                type="text"
                name="login"
                placeholder="You login"
                label="login"
            }}}
            {{#if error}}{{error}}{{/if}}
            {{{Button text="login" class="form__btn btn__events"  onClick=onSubmit}}}
            </form>  
        `
    }
}



// {{#if edit}}
// {{#each change}}
//     <label class="form__label">
//         {{label}}
//         <input class="form__input" type="{{type}}" name="{{name}}">
//     </label>
// {{/each}}
// <button class="form__btn btn__events" name="submit">{{title}}</button>
// {{/if}}

// {{#if readonly}}
// {{#each fields}}
//     <label class="form__label">
//         {{label}}
//         <input class="form__input" name="{{name}}" placeholder="{{label}}" readonly>
//     </label>
// {{/each}}
// {{/if}}