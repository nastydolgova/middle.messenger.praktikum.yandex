import Block from 'utils/Block'

import './registration.css'

export class RegPage extends Block {

    render() {
        return `
            <div class="container">
                <section class="login__section registration">
                    <h2 class="login__title"> Регистрация </h2>
                    <form>
                        {{{ Form }}}
                    </form>
                    <a href="../login/login.hbs" class="form__link btn__events">Войти</a>
                </section>
            </div>
        `
    }
}

// {{> 'form/form' save=true label="Пароль" title="Зарегистрироваться"}}