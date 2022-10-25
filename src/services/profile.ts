import { profileAPI } from 'api/profile'
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
