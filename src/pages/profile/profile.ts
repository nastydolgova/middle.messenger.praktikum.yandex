import Block from 'core/Block'
import { withUser, withStore, withRouter } from 'utils'
import { logout } from 'services/auth'
import { CoreRouter, Store } from 'core'
import { Field } from 'models/FieldModel'

import './profile.css'

type ProfilePageProps = {
    router: CoreRouter
    store: Store<AppState>
    user: User | null
    onLogout?: () => void
    onNavigateNext?: () => void
    back?: () => void
}

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

export class ProfilePage extends Block<ProfilePageProps> {
    static componentName = 'ProfilePage';

    constructor(props: ProfilePageProps) {
        super(props)

        this.setProps({
            onLogout: () => this.props.store.dispatch(logout),
            onNavigateNext: () => this.onNavigateNext(),
            back: () => this.back(),
        })
    }

    onNavigateNext() {
        if (this.props.store.getState().user) {
            this.props.router.go('/edit')
        } else {
            this.props.router.go('/login')
        }
    }

    back(){
        if (this.props.store.getState().user) {
            this.props.router.go('/chat')
        } else {
            this.props.router.go('/login')
        }
    }

    render() {
        if(!this.props.user){
            return `
                <div>
                    no authorized user
                </div>
            `
        } else {
            return  `
                <div class="container">
                    <div class="profile__link--back">
                        {{{Button class="profile__arrow-back btn__events" text="Назад" onClick=back}}}
                    </div>
                    <section class="profile">
                        <img class="profile__img" src="#" width="130" height="130" alt="Аватар">
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
                            {{{Button class="profile__link profile__link-list" text="Изменить данные" onClick=onNavigateNext}}}
                            {{{Button class="profile__link profile__link-list profile__link--exit" text="Выйти" onClick=onLogout}}}
                        </div>
                    </section>
                </div>
            `
        }
    }
}

export default withRouter(withStore(withUser(ProfilePage)))