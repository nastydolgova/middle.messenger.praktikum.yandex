import Block from 'utils/Block'
import './error-page-500.css'

export class ErrorPage500 extends Block {

    render() {
        return `
        <div class="container">
            <div class="error__box">
                <h1 class="error__title">500</h1>
                <p class="error__description"> Мы уже фиксим </p>
                <a class="error__link btn__events" href="/">Назад к чатам</a>
            </div>
        </div>
        `
    }
}
