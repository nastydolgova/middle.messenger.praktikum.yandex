import Block from 'utils/Block'
import { Field } from 'models/FieldModel'
import './profile.css'

const fields: Field[] = [
    {
        type: 'text',
        name: 'login',
        label: 'Имя пользователя',
        value: 'Ivanov'
    },
    {
        type: 'email',
        name: 'email',
        label: 'Почта',
        value: 'Iv@ya.ru'
    },
    {
        type: 'text',
        name: 'first_name',
        label: 'Имя',
        value: 'Ivan'
    },
    {
        type: 'text',
        name: 'second_name',
        label: 'Фамилия',
        value: 'Ivanov'
    },
    {
        type: 'phone',
        name: 'phone',
        label: 'Телефон',
        value: '+7999999999'
    }
] as Field[]

export class ProfilePage extends Block {
    constructor(){
        super()

        this.setProps({
            isOpen: false,
        })
    }

    render() {
        return `
            <div class="container">
                <a href="" class="profile__link--back">
                    <p class="profile__arrow-back btn__events">
                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="13" y="6.80005" width="11" height="1.6" transform="rotate(-180 13 6.80005)" fill="white"/>
                            <path d="M6 11L2 6L6 1" stroke="white" stroke-width="1.6"/>
                        </svg>
                    </p>
                </a>
                <section class="profile">
                    <button class="profile__change-avatar">
                        <span>Поменять аватар</span>
                        <img class="profile__img" src="#" width="130" height="130">
                    </button>
                    <form> 
                        ${(fields.map(item => 
                            `{{{ControlledInput
                                ref="${item.name + `InputRef`}"
                                readonly="readonly"
                                type="${item.type}"
                                name="${item.name}"
                                label="${item.label}"
                                value="${item.value}"
                            }}}
                            `
                        )).join(' ')}
                    </form>
                    <div class="profile__events">
                        <a href="/edit" class="profile__link">Изменить данные</a>
                        <a href="/login" class="profile__link profile__link--exit">Выйти</a> 
                    </div>
                    {{#if isOpen}}
                        {{{ AvatarPopUp }}}
                    {{/if}}
                </section>
            </div>
        `
    }
}
