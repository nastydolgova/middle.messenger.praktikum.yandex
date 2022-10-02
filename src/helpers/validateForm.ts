export enum ValidateType{
    Login = 'login',
    Password = 'password',
    FirstName = 'first_name',
    SecondName = 'second_name',
    Email = 'email',
    Phone = 'phone',
    Message = 'message'
}

type ValidateRule = {
    type: string
    value: string
}

export function validateForm(rules: ValidateRule[]) {
    let errorMessage = ''
    for(let i = 0; i < rules.length; i++){
        const {type, value} = rules[i]
        if(type == ValidateType.Login) {
            if (value.length < 3 || value.length > 20) {
                errorMessage = 'В логине должен быть от 3 до 20 символов'
                break
            }
            if (!(/^[a-zA-Z1-9\-_]+$/.test(value))) {
                errorMessage = 'В логине должны быть только латинские буквы'
                break
            }
            if (/^\d+$/.test(value)) {
                errorMessage = 'Логин не должен состоять из цифр'
                break
            }
        } else if(type == ValidateType.Password) {
            if (!(/^.{8,40}$/.test(value))) {
                errorMessage = 'Пароль должен содержать от 8 до 40 символов'
                break
            }
            if (!(/^.*[A-Z\d]+.*$/.test(value))) {
                errorMessage = 'Пароль должен содержать хотя бы одну заглавную букву или цифру'
                break
            }
        } else if(type == ValidateType.FirstName || type == ValidateType.SecondName) {
            if (!(/^[A-ZА-Я][a-zA-Z\-]*$/.test(value))) {
                errorMessage = 'Латиница или кириллица, первая букава заглавная, без цифр и спец символов (дефис допустим)'
                break
            }
        } else if(type == ValidateType.Email) {
            if (value.length < 1) {
                errorMessage = 'Это обязательное поле'
                break
            }
            if (!(/^[\w\-]+@[\w\-]+\.[\w\-]+$/.test(value))) {
                errorMessage = 'Email должен быть формата name@domen.com'
                break
            }
        } else if(type == ValidateType.Phone) {
            if (!(/^[+\d]\d{9,14}$/.test(value))) {
                errorMessage = 'От 10 до 15 символов, состоит из цифр, может начинается с плюса'
                break
            }
        }
    }

    return errorMessage
}