import { HTTP } from 'core/HTTP'

type LoginRequestData = {
    login: string
    password: string
}

export type SignupRequestData = {
    login: string
    password: string
    first_name: string
    second_name: string
    email: string
    phone: string
}

export type Response<T> = {
    response: T
}

export const authAPI = {
    login: (data: LoginRequestData): Response<unknown> | PromiseLike<Response<unknown>> => HTTP.post('auth/signin', { data }),

    me: (): Response<unknown> | PromiseLike<Response<unknown>> => HTTP.get('auth/user'),

    logout: (): Response<unknown> | PromiseLike<Response<unknown>> => HTTP.post('auth/logout'),

    signup: (data: SignupRequestData): Response<unknown> | PromiseLike<Response<unknown>> => HTTP.post('auth/signup', { data }),
}
