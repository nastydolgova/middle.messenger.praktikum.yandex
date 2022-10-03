import Block from '../../utils/Block'

import './msg-info.css'

// interface MsgInfoProps {
//   text: string
//   onClick: () => void
// }

export class MsgInfo extends Block {
    static componentName = 'MsgInfo'
//   constructor({text, onClick}: MsgInfoProps) {
//     super({text, events: {click: onClick}})
//   }

    protected render(): string {
        return `
            <div class="msgs__item-info">
                <svg width="11" height="5" viewBox="0 0 11 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <line y1="-0.5" x2="3.765" y2="-0.5" transform="matrix(0.705933 0.708278 -0.705933 0.708278 0.700195 2.33313)" stroke="#3369F3"/>
                    <line y1="-0.5" x2="5.6475" y2="-0.5" transform="matrix(0.705933 -0.708278 0.705933 0.708278 3.35828 5.00006)" stroke="#3369F3"/>
                    <line y1="-0.5" x2="5.6475" y2="-0.5" transform="matrix(0.705933 -0.708278 0.705933 0.708278 6.01587 5.00006)" stroke="#3369F3"/>
                </svg>
                <time> 11:58 </time>
            </div>
        `
    }
}
