import { Block } from 'core'
import { validateForm } from 'helpers/validateForm'
import { Field } from 'models/FieldModel'
import { CoreRouter, Store } from 'core'
import { withUser, withStore, withRouter } from 'utils'
import { setAvatar } from 'services/profile'

import './edit.css'

type EditPageProps = {
    router: CoreRouter
    store: Store<AppState>
    user: User | null
    error: string
    onInput: (e: any) => void
    onFocus: () => void
    onSubmit: (e: any) => void
    validate: () => void
    back?: () => void
}
  

const fields: Field[] = [
    {
        ref: '',
        type: 'file',
        name: 'avatar',
        label: 'Аватар',
        value: '',
    },
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

export class EditPage extends Block<EditPageProps> {
    static componentName = 'EditPage'

    constructor(props: EditPageProps){
        super(props)

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
                const avatar = document.getElementById("avatar") as HTMLInputElement;
                const formData: any = new FormData();
                if (avatar.files && avatar!.files[0]) {
                    formData.append("avatar", avatar!.files[0]);
                    this.props.store.dispatch(setAvatar, formData);
                }
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
                    console.log(Object.fromEntries(info))
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
            },
            back: () => this.back()
        })
    }

    back(){
        if (this.props.store.getState().user) {
            this.props.router.go('/profile')
        } else {
            this.props.router.go('/login')
        }
    }

    render() {
        return `
            <div class="container">
            <div class="profile__link--back">
                {{{Button class="profile__arrow-back btn__events" text="Назад" onClick=back}}}
            </div>
                <section class="edit">
                    <form>
                    <p class="file__description">Для изменения аватара загрузите изображение</p>
                    <label class="file__label">
                        <img src="${`https://ya-praktikum.tech/api/v2/resources` + this.props.user!.avatar}" width="50" height="50" alt="Аватар">
                        <input type="file" name="avatar" id="avatar" accept="image/*,image/jpeg">
                    </label>
                    {{{Button class="form__btn btn__events" text="Сохранить" onClick=onSubmit}}}
                    </form>
                </section>
            </div>
        `
    }
}

export default withRouter(withStore(withUser(EditPage)))

// {{{ControlledInput
//     ref="avatarInputRef"
//     type="file"
//     name="avatar"
//     label="Аватар"
// }}}
// {{{ControlledInput
//     ref="emailInputRef"
//     readonly="readonly"
//     type="email"
//     name="email"
//     label="Почта"
//     value="${this.props.user!.email}"
// }}}
// {{{ControlledInput
//     ref="first_nameInputRef"
//     readonly="readonly"
//     type="text"
//     name="first_name"
//     label="Имя"
//     value="${this.props.user!.first_name}"
// }}}
// {{{ControlledInput
//     ref="second_nameInputRef"
//     readonly="readonly"
//     type="text"
//     name="second_name"
//     label="Фамилия"
//     value="${this.props.user!.second_name}"
// }}}
// {{{ControlledInput
//     ref="phoneInputRef"
//     readonly="readonly"
//     type="phone"
//     name="phone"
//     label="Телефон"
//     value="${this.props.user!.phone}"
// }}}


// ${(fields.map(item => 
//     `{{{ControlledInput
//         ref="${item.name + `InputRef`}"
//         type="${item.type}"
//         name="${item.name}"
//         label="${item.label}"
//         value="${item.value}"
//         onInput=onInput
//         onFocus=onFocus
//     }}}
//     `
// )).join(' ')}