import Block from 'utils/Block'
// import { validateForm, ValidateType } from 'helpers/validateForm';

import './chat.css'

export class ChatPage extends Block {
    constructor(){
        super()
    }

    render() {
        return `
            <div class="container">
                <section class="chat-list">
                <div class="chat__info">
                    <a href="/profile" class="chat-list__link chat__link btn__events"> 
                    <span>Профиль</span> 
                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 9L5 5L1 1" stroke="#999999"/>
                    </svg>
                    </a>
                    <input class="chat__list-search" type="text" name="login" placeholder="Поиск"></input>
                </div>
                {{{ ChatItem }}}
                </section> 
                {{{ ChatField }}}
            </div>
        `
    }
}
