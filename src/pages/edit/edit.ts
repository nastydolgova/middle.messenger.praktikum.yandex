import { Block } from 'core'
import { validateForm, ValidateType } from 'helpers/validateForm'
import { Field } from 'models/FieldModel'
import Info from 'models/InfoModel'
import './edit.css'

const fields: Field[] = [
    {
        ref: 'loginInputRef',
        type: 'text',
        name: 'login',
        label: 'Имя пользователя',
        value: 'Ivanov',
    },
    {
        ref: 'emailInputRef',
        type: 'email',
        name: 'email',
        label: 'Почта',
        value: 'Iv@ya.ru'
    },
    {
        ref: 'first_nameInputRef',
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        value: 'Ivan'
    },
    {
        ref: 'second_nameInputRef',
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        value: 'Ivanov'
    },
    {
        ref: 'phoneInputRef',
        type: 'phone',
        name: 'phone',
        label: 'Телефон',
        value: '+7999999999'
    },
    {   
        type: 'text',
        label: 'Имя в приложении',
        name: 'display_name',
        value: 'IIVAN'
    },
    {   
        ref: 'passwordInputRef',
        type: 'password',
        label: 'Старый пароль',
        name: 'oldPassword',
        value: '1234567Q'
    },
    {   
        ref: 'passwordInputRef',
        type: 'password',
        label: 'Новый пароль',
        name: 'newPassword',
        value: '1234567Q'
    }
] as Field[]

export class EditPage extends Block {

    constructor(){
        super()

        this.setProps({
            onInput: (e: any): void  => {
                let errorMsg = validateForm([
                    {type: e.target.name, value: e.target.value},
                ]) 
                // @ts-ignore
                this.refs[e.target.name + 'InputRef'].refs.errorRef.setProps({ text: errorMsg })
                let currentInput = fields.find((item: Field) => item.name == e.target.name)
                if(currentInput) currentInput.value = e.target.value
            },
            onFocus: (): void => console.log('focus'),
            onSubmit: (e: any): void => {
                e.preventDefault()
                this.props.validate()
                let isCorrect = true
                fields.forEach((item: Field) => {
                    //@ts-ignore
                    if (this.refs[item.name+'InputRef'].refs.errorRef.props.text != '') isCorrect = false
                })
                if (isCorrect) {
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
                    let errorMsg = ''
                    if( inputEl.name == 'newPassword' || inputEl.name == 'oldPassword'){
                        errorMsg = validateForm([
                            {type: 'password', value: inputEl.value},
                        ]) 
                    } else {
                        errorMsg = validateForm([
                            {type: inputEl.name, value: inputEl.value},
                        ]) 
                    }
                    //@ts-ignore
                    this.refs[field.name+'InputRef'].refs.errorRef.setProps({ text: errorMsg })
                })
            }
        })
    }

    render() {
        return `
            <div class="container">
                <a href="/profile" class="profile__link--back">
                    <p class="profile__arrow-back btn__events">
                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="13" y="6.80005" width="11" height="1.6" transform="rotate(-180 13 6.80005)" fill="white"/>
                            <path d="M6 11L2 6L6 1" stroke="white" stroke-width="1.6"/>
                        </svg>
                    </p>
                </a>
                <section class="edit">
                    <form>
                    ${(fields.map(item => 
                        `{{{ControlledInput
                            ref="${item.name + `InputRef`}"
                            type="${item.type}"
                            name="${item.name}"
                            label="${item.label}"
                            value="${item.value}"
                            onInput=onInput
                            onFocus=onFocus
                        }}}
                        `
                    )).join(' ')}
                    {{{Button text="Сохранить" onClick=onSubmit}}}
                    </form>
                </section>
            </div>
        `
    }
}
