export enum ValidateType{
    Login = 'login',
    Password = 'password'
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
            if (/^[a-zA-Z1-9\-_]+$/.test(value) === false) {
                errorMessage = 'В логине должны быть только латинские буквы'
                break
            }
            if (/^\d+$/.test(value) === true) {
                errorMessage = 'Логин не должен состоять из цифр'
                break
            }
        } else if(type == ValidateType.Password) {
            if (/^.{8,40}$/.test(value) === false) {
                errorMessage = 'Пароль должен содержать от 8 до 40 символов'
            }
            if (/^.*[A-Z\d]+.*$/.test(value) === false) {
                errorMessage = 'Пароль должен содержать хотя бы одну заглавную букву или цифру'
            }
        }
    }

    return errorMessage
}