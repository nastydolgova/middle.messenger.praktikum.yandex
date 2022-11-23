import { HTTP } from 'core/HTTP'

export type PasswordPayload = {
    oldPassword: string
    newPassword: string
}

export type UserData = {
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

export const profileAPI = {
    sendProfile: (data: UserData): Response<unknown> | PromiseLike<Response<unknown>> => HTTP.put('user/profile', { data }),
    changePassword: (data: PasswordPayload): Response<unknown> | PromiseLike<Response<unknown>> => HTTP.put('user/password', { data }),
    setAvatar: (data: FormData): Response<unknown> | PromiseLike<Response<unknown>> => HTTP.put('user/profile/avatar', { data }),
}
