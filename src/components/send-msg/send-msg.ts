import Block from '../../utils/Block'
import { validateForm, ValidateType } from 'helpers/validateForm'

import './send-msg.css'

interface SentMsgProps {
    onClick: () => void
}

export class SendMsg extends Block {
    static componentName = 'SendMsg';

    constructor() {
        super({
                onBlur:() => {
                    this.props.validate()
                },
                onSubmit: (): void => {
                    const textAreaEl = this.element?.querySelector("[name=message]") as HTMLTextAreaElement
                    const error = validateForm([{type: textAreaEl.name, value: textAreaEl.value}])
                    this.refs.errorRef.setProps({ text: error })
                    if(!error) console.log({message: textAreaEl.value})
                },
                validate: (): void => {
                    const textAreaEl = this.element?.querySelector("[name=message]") as HTMLTextAreaElement
                    const error = validateForm([{type: textAreaEl.name, value: textAreaEl.value}])
                    this.refs.errorRef.setProps({ text: error })
                }
            })
        }
    

    protected render(): string {
        return `
            <div>
                <div class="wrp__send">
                    <button class="sent__button sent__button--add btn__events">
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M7.18662 13.5L14.7628 5.92389L15.7056 6.8667L8.12943 14.4428L7.18662 13.5Z" fill="#999999"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.70067 16.0141L17.2768 8.43793L18.2196 9.38074L10.6435 16.9569L9.70067 16.0141Z" fill="#999999"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0433 21.3567L22.6195 13.7806L23.5623 14.7234L15.9861 22.2995L15.0433 21.3567Z" fill="#999999"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5574 23.8708L25.1335 16.2946L26.0763 17.2374L18.5002 24.8136L17.5574 23.8708Z" fill="#999999"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5574 23.8709C14.9423 26.486 10.7118 26.4954 8.10831 23.8919C5.50482 21.2884 5.51424 17.0579 8.12936 14.4428L7.18655 13.5C4.0484 16.6381 4.0371 21.7148 7.16129 24.839C10.2855 27.9632 15.3621 27.9518 18.5003 24.8137L17.5574 23.8709Z" fill="#999999"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M22.6195 13.7806L23.5623 14.7234C26.003 12.2826 26.0118 8.3341 23.5819 5.90417C21.152 3.47424 17.2035 3.48303 14.7627 5.92381L15.7055 6.86662C17.6233 4.94887 20.7257 4.94196 22.6349 6.85119C24.5441 8.76042 24.5372 11.8628 22.6195 13.7806Z" fill="#999999"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M9.70092 16.0144C7.95751 17.7578 7.95123 20.5782 9.68689 22.3138C11.4226 24.0495 14.2429 24.0432 15.9863 22.2998L15.0435 21.357C13.8231 22.5774 11.8489 22.5818 10.6339 21.3668C9.41894 20.1518 9.42334 18.1776 10.6437 16.9572L9.70092 16.0144Z" fill="#999999"/>
                        </svg>
                    </button>
                        {{{ TextArea 
                            name="message"
                            placeholder="Сообщение"
                            rows="1"
                            cols="45"
                            onBlur=onBlur
                        }}}
                    {{{SendButton onClick=onSubmit}}}
                </div>
                {{{ErrorComponent ref="errorRef" text=error}}}
            </div>
        `
    }
}

