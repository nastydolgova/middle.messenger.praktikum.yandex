import { HTTP } from 'core/HTTP'

type LoginRequestData = {
    login: string
    password: string
}

export const authAPI = {
    login: (data: LoginRequestData) => HTTP.post('auth/signin', {data}),

    me: () => HTTP.get('auth/user'),

    logout: () => HTTP.post('auth/logout'),
}
