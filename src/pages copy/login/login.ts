import Block from 'utils/Block';
import { validateForm, ValidateType } from 'helpers/validateForm';

export class LoginPage extends Block {
  constructor(){
    super()

    this.setProps({
      error: '',
      loginValue: '',
      passwordValue: '',
      onInput:(e: any) => {
        const inputEl = e.target as HTMLInputElement;
        const errorMessage = validateForm([
          {type: ValidateType.Login, value: inputEl.value},
        ])
        //@ts-ignore
        this.refs.loginInputRef.refs.errorRef.setProps({ text: errorMessage})
      },
      onFocus:() => console.log('focus'),
      onSubmit: () => {
        const loginEl = this.element?.querySelector('input[name="login"]') as HTMLInputElement
        // const passwordEl = this.element?.querySelector('input[name=password]') as HTMLInputElement
        const errorMessage = validateForm([
          {type: ValidateType.Login, value: loginEl.value},
          // {type: ValidateType.Password, value: passwordEl.value}
        ])
        // @ts-ignore
        this.refs.loginInputRef.refs.errorRef.setProps({ text: errorMessage })
        
      }
    })
  }

  render() {
    return `
      <div class="screen screen_theme_full">
        <div class="screen__content">
          {{{ ControlledInput
            ref="loginInputRef"
            onInput=onInput
            onFocus=onFocus
            type="text"
            name="login"
            placeholder="You login"
            label="login"
          }}}
        {{#if error}}{{error}}{{/if}}
        {{{Button text="login" onClick=onSubmit}}}
        </div>
      </div>
    `;
  }
}
