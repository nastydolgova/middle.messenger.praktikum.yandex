import { authAPI } from 'api/auth'
import type { Dispatch } from 'core'
import { apiHasError } from 'utils'

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
    state: AppState,
    action: LoginPayload,
) => {
    dispatch({ isLoading: true })
    try {
        const response = await authAPI.login(action)
            //@ts-ignore
        if (response.reason) {
            //@ts-ignore
            dispatch({ isLoading: false })
            window.router.go('/login')
            return
        }
        const responseUser = await authAPI.me()
        dispatch({ isLoading: false })
        //@ts-ignore
        if (responseUser.reason) {
            dispatch(logout)
            return
        }
    //@ts-ignore
        dispatch({ user: responseUser.response  as User})
        window.router.go('/chat')
    } catch (err) {
        dispatch(logout)
        console.log(err)
    }
}

export const logout = async (dispatch: Dispatch<AppState>) => {
    dispatch({ isLoading: true })
    try {
        await authAPI.logout()
        dispatch({ isLoading: false, user: null })
        window.router.go('/login')
    } catch (err) {
        dispatch(logout)
        console.log(err)
    }
}

export const signup = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: SingUpPayload,
) => {
    dispatch({ isLoading: true })
    try {
        const response = await authAPI.signup(action)
        if (apiHasError(response)) {
            dispatch({ isLoading: false })
            return
        }
        const responseUser = await authAPI.me()
        dispatch({ isLoading: false })
        if (apiHasError(responseUser)) {
            dispatch(logout)
            return
        }
        dispatch({ user: responseUser as User })
        window.router.go('/chat')
    } catch(err) {
        dispatch(logout)
        console.log(err)
    }
}

export const me = async(
    dispatch: Dispatch<AppState>,
    state: AppState,
) => {
    dispatch({ isLoading: true })
    try{
        const responseUser = await authAPI.me()
        dispatch({ isLoading: false })
        if (apiHasError(responseUser)) {
            dispatch(logout)
            return
        }
        dispatch({ user: responseUser as User })
        window.router.go('/chat')
    } catch(err) {
        dispatch(logout)
        console.log(err)
    }
}