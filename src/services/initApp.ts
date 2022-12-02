import { authAPI } from 'api/auth'
import type { Dispatch } from 'core'
import { apiHasError } from 'utils'

export async function initApp(dispatch: Dispatch<AppState>) {

    await new Promise(r => setTimeout(r, 700))

    try {
        const { response } = await authAPI.me()
        if (apiHasError(response)) {
            return
        }
        dispatch({ user: response as User })
    } catch (err) {
        console.error(err)
    } finally {
        dispatch({ appIsInited: true })
    }
}
