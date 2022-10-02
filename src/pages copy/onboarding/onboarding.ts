// src/pages/onboarding/onboarding.ts
import Block from '../../utils/Block';

export class OnboardingPage extends Block {

  constructor(){
    super();

    this.setProps({
      onButtonClick: this.onButtonClick.bind(this)
    })
  }

  onButtonClick(){
    console.log('clicked')
  }

  render() {
    return `
    <div class="screen screen_theme_full">
      <div class="screen__content">
        {{{Button text="Login" onClick=onButtonClick}}}
        <div>вар
          {{{Link text="Login" to="/login"}}}
          {{{Link text="Sign Up" to="/signup"}}}
        </div>
      </div>
    </div>
    `;
  }
}