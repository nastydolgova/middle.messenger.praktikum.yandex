import { Block } from 'core'
import { CoreRouter, Store } from 'core'
import { withUser, withStore, withRouter } from 'utils'
import { addChat } from 'services/chat'
import { Chat } from 'models/ChatModel'
import { getToken, connectUserToChat } from 'services/messages'
import './chat.css'

type ChatPageProps = {
    router: CoreRouter
    store: Store<AppState>
    user: User | null
    chatList: Chat[]
    socket: WebSocket
    selectChatToken: string
    activeChat: number
    onNavigateNext?: () => void
    selectChat: (e: Event) => void
    addChat: () => void
}

export class ChatPage extends Block<ChatPageProps> {
    static componentName = 'ChatPage'
    constructor(props: ChatPageProps) {
        super(props)
    
        this.setProps({
            activeChat: 0,
            onNavigateNext: () => {
                if (this.props.store.getState().user) {
                this.props.router.go('/profile')
                } else {
                    //@ts-ignore
                    window.location.pathname('/login')
                }
            },
            addChat: () => {
                const inputEl = this.element?.querySelector('input[name=title]') as HTMLInputElement
                this.props.store.dispatch(addChat, {title: inputEl.value})
            },
            selectChat: (e: Event) => {
                this.props.activeChat = e.path[1].id
                this.props.store.dispatch(getToken, [this.props.user?.id, this.props.activeChat])
            }
        })
    }
    render() {
        if(!this.props.user){
            return `Авторизауйтесь для просмотра`
        } else {
            let chats: Chat[] = this.props.store.getState().chatList
            let activeChat: number = this.props.activeChat
            return `
                <div class="container">
                    <section class="chat-list">
                    <div class="chat__info">
                    {{{Button class="chat-list__link chat__link btn__events" text="Профиль" onClick=onNavigateNext}}}
                    </div>
                        ${(chats.map(item => 
                            `<div class="chat__item-click" id="${item.id}">
                                {{{Button onClick=selectChat class="chat__btn-choose"}}}
                                {{{ ChatItem 
                                    chat_avatar="${item.chat_avatar}"
                                    text="${item.text}"
                                    time="${item.time}"
                                    title="${item.title}"
                                    unread_count="${item.unread_count}"
                                }}}
                            </div>
                            `
                        )).join(' ')}
                    <div class="chat__add">
                        {{{ ControlledInput
                            type="text"
                            name="title"
                            label="Название чата"
                        }}}
                        {{{Button class="chat-list__link chat__link btn__events" text="Добавить чат" onClick=addChat}}}
                    </div>
                    </section> 
                    ${ (activeChat == 0) ? `{{{ ChatEmpty }}}` : `{{{ ChatField chatId=${activeChat} router=router store=store}}}`}
                </div>
            `
        }
    }
}

export default withRouter(withStore(withUser(ChatPage)))
