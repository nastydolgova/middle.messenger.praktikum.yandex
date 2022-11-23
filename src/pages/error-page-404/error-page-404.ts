import { Block } from 'core'
import './error-page-404.css'
import { CoreRouter, Store } from 'core'
import { withStore, withRouter } from 'utils'

type ErrorPage404Props = {
    router: CoreRouter
    store: Store<AppState>
    user: User | null
    back?: () => void
}

export class ErrorPage404 extends Block<ErrorPage404Props> {

    constructor(props: ErrorPage404Props) {
        super(props)
    
        this.setProps({
            back: () => this.back()
        })
    }

    back(){
        if (this.props.store.getState().user) {
        this.props.router.go('/chat')
        } else {
            this.props.router.go('/login')
        }
    }

    render() {
        const user = this.props.store.getState().user

        return `
        <div class="container">
            <div class="error__box">
                <h1 class="error__title">404</h1>
                <p class="error__description"> Не туда попали</p>
                {{{Button class="error__link btn__events" text="${user ? 'Назад к чатам': 'На страницу регистрации'}" onClick=back}}}
            </div>
        </div>
        `
    }
}

export default withRouter(withStore(ErrorPage404))
