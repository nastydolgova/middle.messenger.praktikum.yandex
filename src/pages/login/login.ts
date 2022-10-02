import Block from 'utils/Block'
import { validateForm, ValidateType } from 'helpers/validateForm'

import './login.css'

type Field = {
    ref: string;
    type: string;
    name: string;
    placeholder: string;
    label: string;
}

export class LoginPage extends Block {
    constructor(){
    super()

    this.setProps({
        error: '',
        loginValue: '',
        passwordValue: '',
        fields: [
            {
                ref: 'loginInputRef',
                type: 'text',
                name: 'login',
                placeholder: 'Введите имя',
                label: 'Имя пользователя'
            },
            {
                ref: 'passwordInputRef',
                type: 'password',
                name: 'password',
                placeholder: 'Введите пароль',
                label: 'Пароль'
            }
        ] as Field[],
        onInput: (): void  => {
            this.props.validate()
        },
        onFocus: (): void => console.log('focus'),
        onSubmit: (): void => {
            this.props.validate()
        },
        validate: (): void => {
            const loginEl = this.element?.querySelector('input[name="login"]') as HTMLInputElement
            const passwordEl = this.element?.querySelector('input[name=password]') as HTMLInputElement
            const loginErrorMsg = validateForm([
                {type: ValidateType.Login, value: loginEl.value},
            ]) 
            //@ts-ignore
            this.refs.loginInputRef.refs.errorRef.setProps({ text: loginErrorMsg })

            const passwordErrorMsg = validateForm([
                {type: ValidateType.Password, value: passwordEl.value}
            ])
            //@ts-ignore
            this.refs.passwordInputRef.refs.errorRef.setProps({ text: passwordErrorMsg })
        }
    })
    }

    render() {
    return `
        <div class="container">
            <section class="login__section">
                <h1 class="login__title"> Вход </h1>
                {{#each fields}}
                    {{{ ControlledInput
                        ref="{{ref}}"
                        onInput=onInput
                        onFocus=onFocus
                        type="{{type}}"
                        name="{{name}}"
                        placeholder="{{placeholder}}"
                        label="{{label}}"
                    }}}
                {{/each}}
                {{{Button text="Авторизоваться" onClick=onSubmit}}}
                <a href="#" class="form__link btn__events">Нет аккаунта?</a>
            </section>
        </div>
    `
    }
}