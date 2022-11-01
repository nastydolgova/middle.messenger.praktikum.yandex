import { Block } from 'core'
import { CoreRouter, Store } from 'core'


import './wrp__msgs.css'

interface WrpMsgsProps {
    router: CoreRouter
    store: Store<AppState>
    user: User | null
}

export class WrpMsgs extends Block<WrpMsgsProps> {
    static componentName = 'WrpMsgs'

    constructor(props: WrpMsgsProps) {
        super(props)
    }
    // user_id
    protected render(): string {
        let messages = this.props.store.getState().messages
        let user = this.props.store.getState().user
        return `
            <div class="wrp__msgs">
                ${(messages.map(item => 
                    `<div class="msgs__item ${item.user_id == user?.id ? 'msgs__item--my' : 'msgs__item--other'} ">
                        <p class="msgs__text">  
                            ${item.content}
                        </p>
                    </div>
                    `
                )).join(' ')}
            </div>
        `
    }
}
