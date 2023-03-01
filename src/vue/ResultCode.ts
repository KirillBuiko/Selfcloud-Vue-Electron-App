const enum ResultCode{
    // SERVER PART
    OK = 0,
    FAIL = 1,

    TOKEN_EXPIRED = 101,
    TOKEN_INVALID = 102,

    EMAIL_OR_PHONE_IS_BUSY = 150,
    DATA_IS_INCOMPLETE = 151,

    WRONG_LOGIN_OR_PASSWORD = 160,

    //CLIENT PART
    CONFIGURATION_ERROR = 501,
    CONNECTION_ERROR = 502,
}

export const ResultCodeDescription = {
    [ResultCode.OK]: "Success",
    [ResultCode.FAIL]: "Fail",

    [ResultCode.TOKEN_EXPIRED]: "Token Expired",
    [ResultCode.TOKEN_INVALID]: "Token Invalid",

    [ResultCode.EMAIL_OR_PHONE_IS_BUSY]: "Email or phone is busy",
    [ResultCode.DATA_IS_INCOMPLETE]: "Data incomplete",

    [ResultCode.WRONG_LOGIN_OR_PASSWORD]: "Wrong login or password",

    [ResultCode.CONFIGURATION_ERROR]: "Configuration Error",
    [ResultCode.CONNECTION_ERROR]: "Connection Error",
}

export default ResultCode;
