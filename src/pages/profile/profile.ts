import Block from 'core/Block'
import { withUser, withStore, withRouter } from 'utils'
import { logout } from 'services/auth'
import { CoreRouter, Store } from 'core'

import './profile.css'

type ProfilePageProps = {
    router: CoreRouter
    store: Store<AppState>
    user: User | null
    onLogout?: () => void
    onNavigateNext?: () => void
    back?: () => void
}

export class ProfilePage extends Block<ProfilePageProps> {
    static componentName = 'ProfilePage'

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
        if(this.props.user){
            return  `
                <div class="container">
                    <div class="profile__link--back">
                        {{{Button class="profile__arrow-back btn__events" text="Назад" onClick=back}}}
                    </div>
                    <section class="profile">
                        <img class="profile__img" 
                            src="${ this.props.user!.avatar != null ? `https://ya-praktikum.tech/api/v2/resources` + this.props.user!.avatar : '#'}" 
                            width="130" height="130" alt="Аватар"
                        >
                        <form>
                            {{{ControlledInput
                                ref="loginInputRef"
                                readonly="readonly"
                                type="text"
                                name="login"
                                label="Имя пользователя"
                                value="${this.props.user!.login}"
                            }}}
                            {{{ControlledInput
                                ref="emailInputRef"
                                readonly="readonly"
                                type="email"
                                name="email"
                                label="Почта"
                                value="${this.props.user!.email}"
                            }}}
                            {{{ControlledInput
                                ref="first_nameInputRef"
                                readonly="readonly"
                                type="text"
                                name="first_name"
                                label="Имя"
                                value="${this.props.user!.first_name}"
                            }}}
                            {{{ControlledInput
                                ref="second_nameInputRef"
                                readonly="readonly"
                                type="text"
                                name="second_name"
                                label="Фамилия"
                                value="${this.props.user!.second_name}"
                            }}}
                            {{{ControlledInput
                                ref="phoneInputRef"
                                readonly="readonly"
                                type="phone"
                                name="phone"
                                label="Телефон"
                                value="${this.props.user!.phone}"
                            }}}
                        </form>
                        <div class="profile__events">
                            {{{Button class="profile__link profile__link-list" text="Изменить данные" onClick=onNavigateNext}}}
                            {{{Button class="profile__link profile__link-list profile__link--exit" text="Выйти" onClick=onLogout}}}
                        </div>
                    </section>
                </div>
            `
        } else {
            return `
                <p>Вы не авторизованы</p>
            `
        }
    }
}

export default withRouter(withStore(withUser(ProfilePage)))
