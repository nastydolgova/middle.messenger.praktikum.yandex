import { Block } from 'core'
import { CoreRouter, Store } from 'core'
import { withUser, withStore, withRouter } from 'utils'
import { addChat } from 'services/chat'
import './chat.css'

type ChatPageProps = {
    router: CoreRouter
    store: Store<AppState>
    user: User | null
    chatList: any[]
    onNavigateNext?: () => void
    addChat: () => void
}

export class ChatPage extends Block<ChatPageProps> {
    static componentName = 'ChatPage'
    constructor(props: ChatPageProps) {
        super(props)
    
        this.setProps({
            onNavigateNext: () => {
                if (this.props.store.getState().user) {
                this.props.router.go('/profile')
                } else {
                this.props.router.go('/login')
                }
            },
            addChat: () => {
                const inputEl = this.element?.querySelector('input[name=title]') as HTMLInputElement
                this.props.store.dispatch(addChat, {title: inputEl.value})
            }
        })
    }
    render() {
        if(!this.props.user){
            return `Авторизауйтесь для просмотра`
        } else {
            let chats = this.props.store.getState().chatList
            console.log(chats)
            return `
                <div class="container">
                    <section class="chat-list">
                    <div class="chat__info">
                    {{{Button class="chat-list__link chat__link btn__events" text="Профиль" onClick=onNavigateNext}}}
                    </div>
                    ${(chats.map(item => 
                        `{{{ ChatItem 
                            chatAvatar="${item.chatAvatar}"
                            text="${item.text}"
                            time="${item.time}"
                            title="${item.title}"
                            unreadCount="${item.unreadCount}"
                        }}}
                        `
                    )).join(' ')}
                    <div class="chat__add">
                        {{{ ControlledInput
                            type="text"
                            name="title"
                            label="Имя пользователя"
                        }}}
                        {{{Button class="chat-list__link chat__link btn__events" text="Добавить чат" onClick=addChat}}}
                    </div>
                    </section> 
                    {{{ ChatField }}}
                </div>
            `
        }
    }
}

export default withRouter(withStore(withUser(ChatPage)))

