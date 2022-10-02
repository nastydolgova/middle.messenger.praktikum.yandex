import Block from 'utils/Block';

import './edit.css';

export class EditPage extends Block {
    render() {
        return `
            <div class="container">
                <a href="#" class="profile__link--back">
                    <p class="profile__arrow-back btn__events">
                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="13" y="6.80005" width="11" height="1.6" transform="rotate(-180 13 6.80005)" fill="white"/>
                            <path d="M6 11L2 6L6 1" stroke="white" stroke-width="1.6"/>
                        </svg>
                    </p>
                </a>
                <section class="edit">
                    {{{ Form }}}
                </section>
            </div>
        `;
    }
}