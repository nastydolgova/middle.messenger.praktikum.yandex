import { authAPI } from 'api/auth'
import type { Dispatch } from 'core'
import { apiHasError } from 'utils'
import { getChatList } from './chat'

type LoginPayload = {
    login: string
    password: string
}

type SingUpPayload = {
    login: string
    password: string
    first_name: string
    second_name: string
    email: string
    phone: string
}

export const login = async (
    dispatch: Dispatch<AppState>,
    _state: AppState,
    action: LoginPayload,
) => {
    dispatch({ isLoading: true })
    try {
        const { response } = await authAPI.login(action)
        //@ts-ignore
        if (response.reason) {
            dispatch({ isLoading: false })
            window.router.go('/login')
            return
        }
        dispatch(getChatList)
        dispatch(me)
    } catch (err) {
        dispatch(logout)
        console.log(err)
    }
}

export const logout = async (dispatch: Dispatch<AppState>) => {
    dispatch({ isLoading: true })
    try {
        const { response } = await authAPI.logout()
        dispatch({ isLoading: false, user: null })
        if(response) window.router.go('/login')
    } catch (err) {
        console.log(err)
    }
}

export const signup = async (
    dispatch: Dispatch<AppState>,
    _state: AppState,
    action: SingUpPayload,
) => {
    dispatch({ isLoading: true })
    try {
        const { response } = await authAPI.signup(action)
        if (apiHasError(response)) {
            dispatch({ isLoading: false })
            return
        }
        dispatch(getChatList)
        dispatch(me)
    } catch(err) {
        console.log(err)
    }
}

export const me = async(
    dispatch: Dispatch<AppState>,
    _state: AppState,
) => {
    dispatch({ isLoading: true })
    try{
        const { response } = await authAPI.me()
        dispatch({ isLoading: false })
        if (apiHasError(response)) {
            dispatch(logout)
            return
        }
        dispatch({ user: response as User })
        dispatch(getChatList)
        window.router.go('/chat')
    } catch(err) {
        dispatch(logout)
        console.log(err)
    }
}
