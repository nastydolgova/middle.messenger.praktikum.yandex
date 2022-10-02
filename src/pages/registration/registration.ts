import Block from 'utils/Block'
import { validateForm, ValidateType } from 'helpers/validateForm'
import { Field } from 'models/FieldModel'

import './registration.css'

export class RegPage extends Block {
    constructor(){
        super()

        this.setProps({
            error: '',
            fields: [
                {
                    ref: 'loginInputRef',
                    type: 'text',
                    name: 'login',
                    label: 'Имя пользователя'
                },
                {
                    ref: 'passwordInputRef',
                    type: 'password',
                    name: 'password',
                    label: 'Пароль'
                },
                {
                    ref: 'mailInputRef',
                    type: 'email',
                    name: 'email',
                    label: 'Почта'
                },
                {
                    ref: 'firstNameInputRef',
                    type: 'text',
                    name: 'first_name',
                    label: 'Имя'
                },
                {
                    ref: 'secondNameInputRef',
                    type: 'text',
                    name: 'second_name',
                    label: 'Фамилия'
                },
                {
                    ref: 'phoneInputRef',
                    type: 'phone',
                    name: 'phone',
                    label: 'Телефон'
                },
            ] as Field[],
            onInput: (): void  => {
                this.props.validate()
            },
            onFocus: (): void => console.log('focus'),
            onSubmit: (): void => {
                this.props.validate()
            },
            validate: (): void => {
                this.props.fields.forEach((field: Field) => {
                    let atr = `input[name="${field.name}"]`
                    let inputEl = this.element?.querySelector(atr) as HTMLInputElement
                    let errorMsg = validateForm([
                        {type: inputEl.name, value: inputEl.value},
                    ]) 
                    console.log(this.refs)
                    console.log(this.refs[field.ref])
                    //@ts-ignore
                    this.refs[field.ref].refs.errorRef.setProps({ text: errorMsg })
                // })
                // const loginEl = this.element?.querySelector('input[name="login"]') as HTMLInputElement
                // const passwordEl = this.element?.querySelector('input[name=password]') as HTMLInputElement
                // // const 
                
                
                // const loginErrorMsg = validateForm([
                //     {type: ValidateType.Login, value: loginEl.value},
                // ]) 
                // //@ts-ignore
                // this.refs.loginInputRef.refs.errorRef.setProps({ text: loginErrorMsg })

                // const passwordErrorMsg = validateForm([
                //     {type: ValidateType.Password, value: passwordEl.value}
                // ])
                // //@ts-ignore
                // this.refs.passwordInputRef.refs.errorRef.setProps({ text: passwordErrorMsg })
                // if(!this.props.loginErrorMsg && !this.props.passwordErrorMsg) console.log(loginEl.value, passwordEl.value)
            // }
                })
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
                            label="{{label}}"
                        }}}
                    {{/each}}
                    {{{Button text="Зарегистрироваться" onClick=onSubmit}}}
                    <a href="#" class="form__link btn__events">Войти</a>
                </section>
            </div>
        `
    }
//     render() {
//         return `
//             <div class="container">
//                 <section class="login__section registration">
//                     <h2 class="login__title"> Регистрация </h2>
//                     <form>
//                         {{{ Form }}}
//                     </form>
//                     <a href="" class="form__link btn__events">Войти</a>
//                 </section>
//             </div>
//         `
//     }
}

// {{> 'form/form' save=true label="Пароль" title="Зарегистрироваться"}}

// {{#if save}}
// {{#each registration}}
//     <label class="form__label">
//         {{label}}
//         <input class="form__input" type="{{type}}" name="{{name}}">
//     </label>
// {{/each}}
// {{/if}}

// import Block from 'utils/Block'
// import { validateForm, ValidateType } from 'helpers/validateForm'

// import './login.css'

// type Field = {
//     ref: string
//     type: string
//     name: string
//     placeholder: string
//     label: string
// }

// export class LoginPage extends Block {
//     constructor(){
//         super()

//         this.setProps({
//             error: '',
//             loginValue: '',
//             passwordValue: '',
//             fields: [
//                 {
//                     ref: 'loginInputRef',
//                     type: 'text',
//                     name: 'login',
//                     placeholder: 'Введите имя',
//                     label: 'Имя пользователя'
//                 },
//                 {
//                     ref: 'passwordInputRef',
//                     type: 'password',
//                     name: 'password',
//                     placeholder: 'Введите пароль',
//                     label: 'Пароль'
//                 }
//             ] as Field[],
//             onInput: (): void  => {
//                 this.props.validate()
//             },
//             onFocus: (): void => console.log('focus'),
//             onSubmit: (): void => {
//                 this.props.validate()
//             },
//             validate: (): void => {
//                 const loginEl = this.element?.querySelector('input[name="login"]') as HTMLInputElement
//                 const passwordEl = this.element?.querySelector('input[name=password]') as HTMLInputElement
//                 const loginErrorMsg = validateForm([
//                     {type: ValidateType.Login, value: loginEl.value},
//                 ]) 
//                 //@ts-ignore
//                 this.refs.loginInputRef.refs.errorRef.setProps({ text: loginErrorMsg })

//                 const passwordErrorMsg = validateForm([
//                     {type: ValidateType.Password, value: passwordEl.value}
//                 ])
//                 //@ts-ignore
//                 this.refs.passwordInputRef.refs.errorRef.setProps({ text: passwordErrorMsg })
//                  if(!this.props.loginErrorMsg && !this.props.passwordErrorMsg) console.log(loginEl.value, passwordEl.value)
//             }
//         })
//     }

//     render() {
//         return `
//             <div class="container">
//                 <section class="login__section">
//                     <h1 class="login__title"> Вход </h1>
//                     {{#each fields}}
//                         {{{ ControlledInput
//                             ref="{{ref}}"
//                             onInput=onInput
//                             onFocus=onFocus
//                             type="{{type}}"
//                             name="{{name}}"
//                             placeholder="{{placeholder}}"
//                             label="{{label}}"
//                         }}}
//                     {{/each}}
//                     {{{Button text="Авторизоваться" onClick=onSubmit}}}
//                     <a href="#" class="form__link btn__events">Нет аккаунта?</a>
//                 </section>
//             </div>
//         `
//     }
// }