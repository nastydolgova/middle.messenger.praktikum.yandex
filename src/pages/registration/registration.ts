import { Block } from 'core'
import { validateForm } from 'helpers/validateForm'
import { Field } from 'models/FieldModel'
import Info from 'models/InfoModel'
import { withUser, withStore, withRouter } from 'utils'
import { CoreRouter, Store } from 'core'
import { signup } from 'services/auth'

import './registration.css'

type RegPageProps = {
    router: CoreRouter
    store: Store<AppState>
    user: User | null
    back?: () => void
    onInput: (e: any) => void
    onFocus: () => void
    onSubmit: (e: any) => void
    validate: () => void
    onLog: () => void
}

const fields: Field[] = [
    {
        type: 'text',
        name: 'login',
        label: 'Имя пользователя'
    },
    {
        type: 'password',
        name: 'password',
        label: 'Пароль'
    },
    {
        type: 'email',
        name: 'email',
        label: 'Почта'
    },
    {
        type: 'text',
        name: 'first_name',
        label: 'Имя'
    },
    {
        type: 'text',
        name: 'second_name',
        label: 'Фамилия'
    },
    {
        type: 'phone',
        name: 'phone',
        label: 'Телефон'
    },
] as Field[]

export class RegPage extends Block<RegPageProps> {
    static componentName = 'RegPage'
    constructor(props: RegPageProps){
        super(props)

        this.setProps({
            onInput: (e: any): void  => {
                let errorMsg = validateForm([
                    {type: e.target.name, value: e.target.value},
                ]) 
                // @ts-ignore
                this.refs[e.target.name + 'InputRef'].refs.errorRef.setProps({ text: errorMsg })
                let field = fields.find((item: Field) => item.name == e.target.name)
                if(field) field.value = e.target.value
            },
            onFocus: (): void => console.log('focus'),
            onSubmit: (e: any): void => {
                console.log('!')
                e.preventDefault()
                this.props.validate()
                let isCorrect = true
                fields.forEach((item: Field) => {
                    //@ts-ignore
                    if (this.refs[item.name + `InputRef`].refs.errorRef.props.text != '') isCorrect = false
                })
                if (isCorrect) {
                    let info: any[] = []
                    fields.forEach((item: Field) => {
                        if(item.value){
                            info.push([item.name , item.value])
                        }
                    })
                    this.props.store.dispatch(signup, Object.fromEntries(info) as Info)
                }
            },
            validate: (): void => {
                fields.forEach((field: Field) => {
                    let atr = `input[name="${field.name}"]`
                    let inputEl = this.element?.querySelector(atr) as HTMLInputElement
                    let errorMsg = validateForm([
                        {type: inputEl.name, value: inputEl.value},
                    ]) 
                    //@ts-ignore
                    this.refs[field.name + `InputRef`].refs.errorRef.setProps({ text: errorMsg })
                })
            },
            onLog: (): void => {
                this.props.router.go('/login');
            }
        })
    }

    render() {
        return `
            <div class="container">
                <section class="login__section registration">
                    <h1 class="login__title"> Регистрация </h1>
                        ${(fields.map(item => 
                            `{{{ControlledInput
                                ref="${item.name + `InputRef`}"
                                type="${item.type}"
                                name="${item.name}"
                                label="${item.label}"
                                onInput=onInput
                                onFocus=onFocus
                            }}}
                            `
                        )).join(' ')}
                    {{{Button class="form__btn btn__events" text="Зарегистрироваться" onClick=onSubmit}}}
                    {{{Button class="form__link btn__events" text="Войти" onClick=onLog}}}
                    </section>
            </div>
        `
    }
}

export default withRouter(withStore(withUser(RegPage)))