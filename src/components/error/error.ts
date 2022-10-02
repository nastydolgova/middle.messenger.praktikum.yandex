import Block from '../../utils/Block'

import './error.css'

interface ErrorProps {
    text?: string
}

export class ErrorComponent extends Block<ErrorProps> {
    static componentName = 'ErrorComponent'

    protected render(): string {
        return `
            <div class="error">{{#if text}}{{text}}{{/if}}</div>
        `
    }
}
