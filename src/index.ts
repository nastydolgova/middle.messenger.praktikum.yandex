import { Block, renderDOM, registerComponent }  from './utils'

import './styles/style.css'

import ChatEmpty from './components/chat-empty'
import ChatField from './components/chat-field'
import ChatItem from './components/chat-item'
import Form from './components/form'
import MsgInfo from './components/msg-info'
import SendMsg from './components/send-msg'
import UserPopup from './components/user-popup'
import WrpMsgs from './components/wrp__msgs'
import Input from './components/input'
import Error from './components/error'
import ControlledInput from './components/controlledInput'
import Button from './components/button'

import { ChatPage } from './pages/сhat/chat'
import { EditPage } from './pages/edit/edit'
import { ErrorPage } from './pages/error-page/error-page'
import { LoginPage } from './pages/login/login'
import { ProfilePage } from './pages/profile/profile'
import { RegPage } from './pages/registration/registration'

registerComponent(ChatEmpty)
registerComponent(ChatField)
registerComponent(ChatItem)
registerComponent(Form)
registerComponent(MsgInfo)
registerComponent(SendMsg)
registerComponent(UserPopup)
registerComponent(WrpMsgs)
registerComponent(Input)
registerComponent(Error)
registerComponent(ControlledInput)
registerComponent(Button)

document.addEventListener("DOMContentLoaded", () => {
    // renderDOM(new LoginPage())
    renderDOM(new RegPage())

    // renderDOM(new ChatPage())
    // renderDOM(new EditPage())
    // renderDOM(new ErrorPage())
    // renderDOM(new ProfilePage())
})