import { registerComponent, Router }  from 'core'

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
import TextArea from './components/textarea'
import SendButton from './components/send-button'

import { ChatPage } from './pages/chat/chat'
import { EditPage } from './pages/edit/edit'
import { ErrorPage500 } from './pages/error-page-500/error-page-500'
import { ErrorPage404 } from './pages/error-page-404/error-page-404'
import { LoginPage } from './pages/login/login'
import { ProfilePage } from './pages/profile/profile'
import { RegPage } from './pages/registration/registration'

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
registerComponent(AvatarPopUp)
registerComponent(SendButton)

const router = new Router();

router
  .use('/', LoginPage)
  .use('/login', LoginPage)
  .use('/settings', EditPage)
  .use('/messenger', ChatPage)
  .use('/error404', ErrorPage404)
  .use('/error500', ErrorPage500)
  .use('/profile', ProfilePage)
  .use('/registration', RegPage)
  .start();