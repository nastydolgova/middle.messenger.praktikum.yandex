import { authAPI } from 'api/auth'
import { UserDTO } from 'api/types'
import type { Dispatch } from 'core'
import { apiHasError } from 'utils'

export async function initApp(dispatch: Dispatch<AppState>) {

    await new Promise(r => setTimeout(r, 700))

    try {
        const response = await authAPI.me()
        //@ts-ignore
        if (apiHasError(response.response)) {
            return
        }
        //@ts-ignore
        dispatch({ user: response.response as UserDTO });
    } catch (err) {
        console.error(err)
    } finally {
        dispatch({ appIsInited: true })
    }
}
