import { withStore, withRouter } from 'utils'
import { login } from 'services/auth'
import { CoreRouter, Store, Block } from 'core'
import { validateForm, ValidateType } from 'helpers/validateForm'

import './login.css'

type LoginPageProps = {
    router: CoreRouter
    store: Store<AppState>
    onLogin: () => void
    error: string
    onInput: (e: Event) => void
    onFocus: () => void
    onSubmit: () => void
    onReg: () => void
}

export class LoginPage extends Block<LoginPageProps> {
    static componentName = 'LoginPage'

    constructor(props: LoginPageProps) {
        super(props)

        this.setProps({
            error: '',
            onInput: (e: Event): void  => {
                const target = e.target as HTMLButtonElement
                if (target === null) {
                    throw new Error('target can not be null');
                }
                let errorMsg = validateForm([
                    {type: target.name, value: target.value},
                ]) 
                this.refs[target.name + 'InputRef'].refs.errorRef.setProps({ text: errorMsg })
            },
            onFocus: (): void => {},
            onSubmit: (): void => {
                const loginEl = this.element?.querySelector('input[name="login"]') as HTMLInputElement
                const passwordEl = this.element?.querySelector('input[name=password]') as HTMLInputElement
                
                const loginErrorMsg = validateForm([
                    {type: ValidateType.Login, value: loginEl.value},
                ]) 
                this.refs.loginInputRef.refs.errorRef.setProps({ text: loginErrorMsg })

                const passwordErrorMsg = validateForm([
                    {type: ValidateType.Password, value: passwordEl.value}
                ])
                this.refs.passwordInputRef.refs.errorRef.setProps({ text: passwordErrorMsg })
                
                if(!loginErrorMsg && !passwordErrorMsg) {
                    this.props.store.dispatch(login, {login: loginEl.value, password: passwordEl.value})
        }
            },
            onReg: (): void => {
                this.props.router.go('/registration')
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
                {{{Button class="form__btn btn__events" text="Авторизоваться" onClick=onSubmit}}}
                {{{Button class="form__link btn__events" text="Нет аккаунта?" onClick=onReg}}}
            </section>
        </div>
        `
    }
}

export default withRouter(withStore(LoginPage))
