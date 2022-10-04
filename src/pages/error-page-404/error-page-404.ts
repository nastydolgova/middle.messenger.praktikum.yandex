import Block from 'utils/Block'
import './error-page-404.css'

export class ErrorPage404 extends Block {

    render() {
        return `
        <div class="container">
            <div class="error__box">
                <h1 class="error__title">404</h1>
                <p class="error__description"> Не туда попали</p>
                <a class="error__link btn__events" href="/">Назад к чатам</a>
            </div>
        </div>
        `
    }
}
