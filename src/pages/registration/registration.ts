import { Block } from 'core'
import { validateForm } from 'helpers/validateForm'
import { Field } from 'models/FieldModel'
import Info from 'models/InfoModel'

import './registration.css'

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

export class RegPage extends Block {
    constructor(){
        super()

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
                e.preventDefault()
                this.props.validate()
                let isCorrect = true
                fields.forEach((item: Field) => {
                    //@ts-ignore
                    if (this.refs[item.name + `InputRef`].refs.errorRef.props.text != '') isCorrect = false
                })
                if (isCorrect) {
                    location.href = '/messenger'
                    let info: any[] = []
                    fields.forEach((item: Field) => {
                        if(item.value){
                            info.push([item.name , item.value])
                        }
                    })
                    console.log(Object.fromEntries(info) as Info)
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
            }
        })
    }

    render() {
        return `
            <div class="container">
                <section class="login__section">
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
                    {{{Button text="Зарегистрироваться" onClick=onSubmit}}}
                    <a href="/login" class="form__link btn__events">Войти</a>
                </section>
            </div>
        `
    }
}
