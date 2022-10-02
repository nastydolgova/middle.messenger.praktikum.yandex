import Block from 'utils/Block'
import { validateForm, ValidateType } from 'helpers/validateForm'

import './login.css'

export class LoginPage extends Block {
    constructor(){
        super()

        this.setProps({
            error: '',
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
                
                if(!this.props.loginErrorMsg && !this.props.passwordErrorMsg) console.log(loginEl.value, passwordEl.value)
            }
        })
    }

    render() {
        return `
            <div class="container">
                <section class="login__section">
                    <h1 class="login__title"> Вход </h1>
                        {{{ ControlledInput
                            ref="loginInputRef"
                            onInput=onInput
                            onFocus=onFocus
                            type="text"
                            name="login"
                            label="Имя пользователя"
                        }}}
                        {{{ ControlledInput
                            ref="passwordInputRef"
                            onInput=onInput
                            onFocus=onFocus
                            type="password"
                            name="password"
                            label="Пароль"
                        }}}
                    {{{Button text="Авторизоваться" onClick=onSubmit}}}
                    <a href="#" class="form__link btn__events">Нет аккаунта?</a>
                </section>
            </div>
        `
    }
}