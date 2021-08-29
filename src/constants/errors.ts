export const ERROR_NOT_HAVE_DATA = 'Нет данных для изменения'
export const ERROR_NOT_FOUND = 'Объект/ы не найден'

export enum GENERAL_ERROR {
    NOT_UNIQUE = 'Данные объекта не уникальны',
    ALREADY_THERE = 'Объект с данным id уже существует',
}

export enum USER_ERROR {
    NOT_UNIQUE_EMAIL = 'Пользователь с такой почтой уже зарегистрирован',
    NOT_UNIQUE_USERNAME = 'Пользователь с таким именем уже зарегистрирован',
    AUTHORIZATION_FAIL = 'Неправильный логин или пароль',
    INVALID_TOKEN = 'Недействительный токен',
}
