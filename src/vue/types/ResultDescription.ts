import {ResultCode} from "@/types/ResultCode";

export const ResultDescription: {[code in ResultCode]: [string, string]} = {
    [ResultCode.OK]: ["Успех",""],
    [ResultCode.CONNECTION_ERROR]: ["Ошибка сети","Не получилось получить ответ от сервера. Возможно, есть проблема с подключением к сети"],
    [ResultCode.CONFIGURATION_ERROR]: ["",""],
    [ResultCode.FAIL]: ["Ошибка","Ошибка запроса к серверу"],

    // authorization exceptions
    [ResultCode.WRONG_LOGIN_OR_PASSWORD]: ["Неверный логин или пароль","Попробуйте ввести данные ещё раз"],

    // password correctness exceptions

    // registration exceptions
    [ResultCode.EMAIL_OR_PHONE_IS_BUSY]: ["",""],

    // token exceptions
    [ResultCode.TOKEN_INVALID]: ["",""],
    [ResultCode.TOKEN_EXPIRED]: ["",""],

    // input errors
    [ResultCode.DATA_IS_INCOMPLETE]: ["Ошибка ввода", "Возможно, вы оставили поле ввода пустым или ввели недопустимые символы"]
}
