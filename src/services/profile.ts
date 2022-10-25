import { profileAPI, UserData, PasswordPayload } from 'api/profile'
import { authAPI } from 'api/auth'

import { UserDTO } from 'api/types'
import type { Dispatch } from 'core'
import { apiHasError } from 'utils'

export const setAvatar = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: FormData,
) => {
    dispatch({ isLoading: true })

    const response = await profileAPI.setAvatar(action)
        //@ts-ignore
    if (apiHasError(response)) {
        //@ts-ignore
        dispatch({ isLoading: false })
        return
    }

    const responseUser = await authAPI.me()

    dispatch({ isLoading: false })
    //@ts-ignore
    if (apiHasError(response)) {
        return
    }

    //@ts-ignore
    dispatch({ user: responseUser.response  as UserDTO})
}

export const sendProfile = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: UserData,
) => {
    dispatch({ isLoading: true })
    const response = await profileAPI.sendProfile(action)
        //@ts-ignore
        if (apiHasError(response)) {
            //@ts-ignore
            dispatch({ isLoading: false })
            return
        }
    }

export const changePassword = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    action: PasswordPayload,
) => {
    dispatch({ isLoading: true })
    const response = await profileAPI.changePassword(action)
        //@ts-ignore
        if (apiHasError(response)) {
            //@ts-ignore
            dispatch({ isLoading: false })
            return
        }
    }