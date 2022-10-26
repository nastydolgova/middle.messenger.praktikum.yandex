import { Block } from 'core'
import { validateForm } from 'helpers/validateForm'
import { Field } from 'models/FieldModel'
import { CoreRouter, Store } from 'core'
import { withUser, withStore, withRouter } from 'utils'
import { setAvatar, sendProfile, changePassword } from 'services/profile'
import { me } from 'services/auth'

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
    setAvatar: (e: any) => void
}

const fields: Field[] = [
    {
        ref: 'loginInputRef',
        type: 'text',
        name: 'login',
        label: 'Имя пользователя',
        value: '',
    },
    {
        ref: 'emailInputRef',
        type: 'email',
        name: 'email',
        label: 'Почта',
        value: ''
    },
    {
        ref: 'first_nameInputRef',
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        value: ''
    },
    {
        ref: 'second_nameInputRef',
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        value: ''
    },
    {
        ref: 'phoneInputRef',
        type: 'phone',
        name: 'phone',
        label: 'Телефон',
        value: ''
    },
    {   
        type: 'text',
        label: 'Имя в приложении',
        name: 'display_name',
        value: ''
    },
    {   
        ref: 'passwordInputRef',
        type: 'password',
        label: 'Старый пароль',
        name: 'oldPassword',
        value: ''
    },
    {   
        ref: 'passwordInputRef',
        type: 'password',
        label: 'Новый пароль',
        name: 'newPassword',
        value: ''
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
                this.props.validate()
                let isCorrect = true
                fields.forEach((item: Field) => {
                    //@ts-ignore
                    if (this.refs[item.name+'InputRef'].refs.errorRef.props.text != '') isCorrect = false
                })
                if (isCorrect) {
                    let info: any[] = []
                    fields.forEach((item: Field) => {
                        if(item.value && item.name != 'newPassword' && item.name != 'oldPassword'){
                            info.push([item.name , item.value])
                        }
                    })
                    this.props.store.dispatch(sendProfile, Object.fromEntries(info));
                    let passwords: any[] = []
                    fields.forEach((item: Field) => {
                        if(item.name == 'newPassword' || item.name == 'oldPassword'){
                            passwords.push([item.name , item.value])
                        }
                    })
                    this.props.store.dispatch(changePassword, Object.fromEntries(passwords));
                }
            },
            setAvatar: (e: any): void => {
                e.preventDefault()
                const avatar = document.getElementById("avatar") as HTMLInputElement;
                const formData: any = new FormData();
                if (avatar.files && avatar!.files[0]) {
                    formData.append("avatar", avatar!.files[0]);
                    this.props.store.dispatch(setAvatar, formData);
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
        fields.map(item => {
            //@ts-ignore
            if(this.props.user[item.name]){
                //@ts-ignore
                item.value = this.props.user[item.name]
            }
        })
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
                        {{{Button class="form__btn btn__events" text="Сохранить изображение" onClick=setAvatar}}}
                    </form>
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
                        {{{Button class="form__btn btn__events" text="Изменить" onClick=onSubmit}}}
                    </form>
                </section>
            </div>
        `
    }
}

export default withRouter(withStore(withUser(EditPage)))
