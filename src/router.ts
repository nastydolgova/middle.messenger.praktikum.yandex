import { Store, renderDOM, CoreRouter } from 'core'
import { getScreenComponent, Screens } from './utils'

const routes = [
    {
        path: '/',
        block: Screens.Chat,
        shouldAuthorized: true,
    },
    {
        path: '/login',
        block: Screens.Login,
        shouldAuthorized: false,
    },
    {
        path: '/profile',
        block: Screens.Profile,
        shouldAuthorized: true,
    },
    {
        path: '/chat',
        block: Screens.Chat,
        shouldAuthorized: true,
    },
    {
        path: '/edit',
        block: Screens.Edit,
        shouldAuthorized: true,
    },
    {
        path: '/registration',
        block: Screens.Registration,
        shouldAuthorized: false,
    },
    {
        path: '*',
        block: Screens.ErrorPage404,
        shouldAuthorized: false,
    },
]

export function initRouter(router: CoreRouter, store: Store<AppState>) {
    routes.forEach(route => {
        router.use(route.path, () => {
            const isAuthorized = Boolean(store.getState().user)
        
            if (isAuthorized || !route.shouldAuthorized) {
                store.dispatch({ screen: route.block })
                return
            } else {
                store.dispatch({ screen: Screens.Login })
            }
        })
    })

    store.on('changed', (prevState, nextState) => {
        if (!prevState.appIsInited && nextState.appIsInited) {
            router.start()
        }
        
        if (prevState.screen !== nextState.screen) {
            const Page = getScreenComponent(nextState.screen)
            renderDOM(new Page({}))
            document.title = `App / ${Page.componentName}`
        }
    })
}
