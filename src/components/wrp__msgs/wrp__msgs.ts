import Block from '../../utils/Block'

import './wrp__msgs.css'

export class WrpMsgs extends Block {
    static componentName = 'WrpMsgs'

    protected render(): string {
        return `
            <div class="wrp__msgs">
                <span class="msgs__date">
                    19 июня
                </span>
                <div class="msgs__item msgs__item--other">
                    <p class="msgs__text">  
                        Привет! Смотри, тут всплыл интересный кусок лунной космической истории — 
                        НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов
                        на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову
                        говоря, все тушки этих камер все еще находятся на поверхности Луны, так как
                        астронавты с собой забрали только кассеты с пленкой.
                    </p>
                    {{{ MsgInfo }}}
                </div>
                <div class="msgs__item msgs__item--my">
                    <p class="msgs__text">Круто!</p>
                    {{{ MsgInfo }}}
                </div>
            </div>
        `
    }
}
