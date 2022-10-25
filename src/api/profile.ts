import { HTTP } from 'core/HTTP'

export type PasswordPayload = {
    oldPassword: string;
    newPassword: string;
}

export type UserData = {
    login: string;
    password: string;
    first_name: string;
    second_name: string;
    email: string;
    phone: string;
}

export const profileAPI = {
    sendProfile: (data: UserData) => HTTP.put('user/profile', data),
    changePassword: (data: PasswordPayload) => HTTP.put('user/password', data),
    setAvatar: (data: FormData) => HTTP.put('user/profile/avatar', data),
}
