import { HTTP } from 'core/HTTP'

type LoginRequestData = {
    login: string
    password: string
}

export type SignupRequestData = {
    login: string;
    password: string;
    first_name: string;
    second_name: string;
    email: string;
    phone: string;
}

export const authAPI = {
    login: (data: LoginRequestData) => HTTP.post('auth/signin', { data }),

    me: () => HTTP.get('auth/user'),

    logout: () => HTTP.post('auth/logout'),

    signup: (data: SignupRequestData) => HTTP.post('auth/signup', { data }),
}
