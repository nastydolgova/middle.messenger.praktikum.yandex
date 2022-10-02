import Block from 'utils/Block'

import './profile.css'

export class ProfilePage extends Block {
    render() {
        return `
            <div class="container">
                <a href="" class="profile__link--back">
                    <p class="profile__arrow-back btn__events">
                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="13" y="6.80005" width="11" height="1.6" transform="rotate(-180 13 6.80005)" fill="white"/>
                            <path d="M6 11L2 6L6 1" stroke="white" stroke-width="1.6"/>
                        </svg>
                    </p>
                </a>
                <section class="profile">
                    <button class="profile__change-avatar">
                        <span>Поменять аватар</span>
                        <img class="profile__img" src="#" width="130" height="130">
                    </button>
                    <form> 
                        {{{ Form }}}
                    </form>
                    <div class="profile__events">
                        <a href="../edit/edit.hbs" class="profile__link">Изменить данные</a>
                        <a href="../login/login.hbs" class="profile__link profile__link--exit">Выйти</a> 
                    </div>
                    <div class="profile__popup hidden">
                        <h4>Загрузить файл</h4>
                        <form method="post">
                            <label class="popup__input">
                                <span class="popup__input-text" type="text"></span>
                                <input type="file" name="file">        
                                <span class="popup__input-btn">Выберите файл</span>
                            </label>
                        </form>
                        <button type="submit" class="form__btn btn__events">
                            Поменять
                        </button>
                    </div>
                </section>
            </div>
        `
    }
}

// {{> 'form/form' readonly=true}} 

