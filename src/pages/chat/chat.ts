import { Block } from 'core'
import { CoreRouter, Store } from 'core'
import { withUser, withStore, withRouter } from 'utils'

import './chat.css'

type ChatPageProps = {
    router: CoreRouter
    store: Store<AppState>
    user: User | null
    onNavigateNext?: () => void
}

export class ChatPage extends Block<ChatPageProps> {
    static componentName = 'ChatPage'
    constructor(props: ChatPageProps) {
        super(props)
    
        this.setProps({
        onNavigateNext: () => this.onNavigateNext(),
        })
    }

    onNavigateNext() {
        if (this.props.store.getState().user) {
        this.props.router.go('/profile')
        } else {
        this.props.router.go('/login')
        }
    }

    render() {
        if(!this.props.user!.login){
            return `Авторизауйтесь для просмотра`
        } else {
            return `
                <div class="container">
                    <section class="chat-list">
                    <div class="chat__info">
                    {{{Button class="chat-list__link chat__link btn__events" text="Профиль" onClick=onNavigateNext}}}
                    </div>
                    {{{ ChatItem }}}
                    </section> 
                    {{{ ChatField }}}
                </div>
            `
        }
    }
}

export default withRouter(withStore(withUser(ChatPage)))