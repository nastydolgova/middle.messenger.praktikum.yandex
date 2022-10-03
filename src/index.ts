import { Block, renderDOM, registerComponent }  from './utils'

import './styles/style.css'

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
import AvatarPopUp from './components/avatar-popup'

import { ChatPage } from './pages/сhat/chat'
import { EditPage } from './pages/edit/edit'
import { ErrorPage500 } from './pages/error-page-500/error-page-500'
import { ErrorPage404 } from './pages/error-page-404/error-page-404'
import { LoginPage } from './pages/login/login'
import { ProfilePage } from './pages/profile/profile'
import { RegPage } from './pages/registration/registration'

function registerComponents(){
    registerComponent(ChatEmpty)
    registerComponent(ChatField)
    registerComponent(ChatItem)
    registerComponent(MsgInfo)
    registerComponent(SendMsg)
    registerComponent(UserPopup)
    registerComponent(WrpMsgs)
    registerComponent(Input)
    registerComponent(Error)
    registerComponent(ControlledInput)
    registerComponent(Button)
    registerComponent(AvatarPopUp)
}

document.addEventListener("DOMContentLoaded", () => {
    registerComponents()

    switch (window.location.pathname){
        case '/':
            renderDOM(new ChatPage())
            break
        case '/registration':
            renderDOM(new RegPage())
            break
        case '/login':
            renderDOM(new LoginPage())
            break
        case '/edit':
            renderDOM(new EditPage())
            break
        case '/profile':
            renderDOM(new ProfilePage())
            break
        case '/error500':
            renderDOM(new ErrorPage500())
            break
        default:
            renderDOM(new ErrorPage404())
            break
    }
})