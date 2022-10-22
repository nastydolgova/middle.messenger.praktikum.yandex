import { withStore, withRouter } from 'utils'
import { login } from 'services/auth'
import { CoreRouter, Store, Block } from 'core'
import { validateForm, ValidateType } from 'helpers/validateForm'

import './login.css'

type LoginPageProps = {
    router: CoreRouter
    store: Store<AppState>
    formError?: () => string | null
    onLogin: () => void
    error: string
    onInput: (e: any) => void
    onFocus: () => void
    onSubmit: () => void
    onReg: () => void
}

export class LoginPage extends Block<LoginPageProps> {
    static componentName = 'LoginPage'

    constructor(props: LoginPageProps) {
        super(props)

        this.setProps({
            formError: () => this.props.store.getState().loginFormError,
            error: '',
            onInput: (e: any): void  => {
                let errorMsg = validateForm([
                    {type: e.target.name, value: e.target.value},
                ]) 
                // @ts-ignore
                this.refs[e.target.name + 'InputRef'].refs.errorRef.setProps({ text: errorMsg })
            },
            onFocus: (): void => console.log('focus'),
            onSubmit: (): void => {
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
