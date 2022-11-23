import { Block } from 'core'
import { CoreRouter, Store } from 'core'
import { addUser, deleteUser } from 'services/chat'
import { AddUserData } from 'api/chat'

import './user-popup.css'

type UserPopupProps = {
    router: CoreRouter
    store: Store<AppState>
    chatId: number
    addUser: (e: Event) => void
    deleteUser: (e: Event) => void
}


export class UserPopup extends Block<UserPopupProps> {
    static componentName = 'UserPopup'

    constructor({...props}: UserPopupProps){
        super({...props})

        this.setProps({
            addUser: (e: Event) => {
                e.preventDefault()
                const addEl = this.element?.querySelector('input[name="add"]') as HTMLInputElement
                const data: AddUserData = {
                    users: [+addEl.value],
                    chatId: this.props.chatId
                }
                this.props.store.dispatch(addUser, data)
            },
            deleteUser: (e: Event) => {
                e.preventDefault()
                const deleteEl = this.element?.querySelector('input[name="delete"]') as HTMLInputElement
                const data: AddUserData = {
                    users: [+deleteEl.value],
                    chatId: this.props.chatId
                }
                this.props.store.dispatch(deleteUser,data)
            }
        })
    }

    protected render(): string {
        return `
            <ul class="user__menu">
                <li>
                    {{{ ControlledInput
                        type="text"
                        name="add"
                        label="Введите ID пользователя"
                    }}}
                    {{{Button class="user__popup-btn" text="Добавить пользователя" onClick=addUser}}}
                </li>
                <li>
                    {{{ ControlledInput
                        type="text"
                        name="delete"
                        label="Введите ID пользователя"
                    }}}
                    {{{Button class="user__popup-btn" text="Удалить пользователя" onClick=deleteUser}}}
                </li>
            </ul>
        `
    }
}
