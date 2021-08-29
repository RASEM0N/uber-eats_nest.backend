export enum USER_ERROR {
    NOT_UNIQUE_EMAIL = 'Пользователь с такой почтой уже зарегистрирован',
    NOT_UNIQUE_USERNAME = 'Пользователь с таким именем уже зарегистрирован',
    AUTHORIZATION_FAIL = 'Неправильный логин или пароль',
    INVALID_TOKEN = 'Недействительный токен',
    NOT_FOUND = 'Пользователь не найден',
}
