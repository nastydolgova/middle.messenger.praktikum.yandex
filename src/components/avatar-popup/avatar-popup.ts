import { Block } from 'core'

import './avatar-popup.css'

export class AvatarPopUp extends Block {
    static componentName = 'AvatarPopUp'

    protected render(): string {
        return `
            <div class="profile__popup">
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
        `
    }
}

