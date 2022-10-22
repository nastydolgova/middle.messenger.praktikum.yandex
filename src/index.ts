import { renderDOM, registerComponent, PathRouter, CoreRouter, Store } from 'core'
import { initApp } from './services/initApp'
import { defaultState } from './store'
import { initRouter } from './router'

import './app.css'

import ChatEmpty from './components/chat-empty'
import ChatField from './components/chat-field'
import ChatItem from './components/chat-item'
import MsgInfo from './components/msg-info'
import SendMsg from './components/send-msg'
import UserPopup from './components/user-popup'
import WrpMsgs from './components/wrp__msgs'
import Input from './components/input'
import Error from './components/error'
import ControlledInput from './components/controlledInput'
import Button from './components/button'
import TextArea from './components/textarea'
import SendButton from './components/send-button'

registerComponent(ChatEmpty)
registerComponent(ChatField)
registerComponent(ChatItem)
registerComponent(MsgInfo)
registerComponent(SendMsg)
registerComponent(TextArea)
registerComponent(UserPopup)
registerComponent(WrpMsgs)
registerComponent(Input)
registerComponent(Error)
registerComponent(ControlledInput)
registerComponent(Button)
registerComponent(SendButton)

declare global {
    interface Window {
        store: Store<AppState>
        router: CoreRouter
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const store = new Store<AppState>(defaultState)
    const router = new PathRouter()


    window.router = router
    window.store = store

    //@ts-ignore
    store.on('changed', (prevState, nextState) => {
        if (process.env.DEBUG) {
        console.log(
            '%cstore updated',
            'background: #222; color: #bada55',
            nextState,
        )
        }
    })

    initRouter(router, store)

    store.dispatch(initApp)
})
