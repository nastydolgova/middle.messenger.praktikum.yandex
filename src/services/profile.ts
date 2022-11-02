import { profileAPI, UserData, PasswordPayload } from 'api/profile'
import { authAPI } from 'api/auth'
import type { Dispatch } from 'core'
import { apiHasError } from 'utils'
import { logout, me } from './auth'

export const setAvatar = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: FormData,
) => {
    dispatch({ isLoading: true })
    try {
        const response = await profileAPI.setAvatar(action)
            //@ts-ignore
        if (apiHasError(response)) {
            //@ts-ignore
            dispatch({ isLoading: false })
            return
        }
        dispatch(me)
    } catch(err) {
        dispatch(logout)
        console.log(err)
    }
}

export const sendProfile = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: UserData,
) => {
    dispatch({ isLoading: true })
    try {
        const { response } = await profileAPI.sendProfile(action)
            //@ts-ignore
            if (apiHasError(response)) {
                //@ts-ignore
                dispatch({ isLoading: false })
                return
            }
    } catch(err) {
        dispatch(logout)
        console.log(err)
    }
}


export const changePassword = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: PasswordPayload,
) => {
    dispatch({ isLoading: true })
    try  {
        const { response } = await profileAPI.changePassword(action)
            //@ts-ignore
            if (apiHasError(response)) {
                //@ts-ignore
                dispatch({ isLoading: false })
                return
            }
            window.router.go('/chat')
    } catch(err) {
        dispatch(logout)
        console.log(err)
    }
}
