declare const enum ResultCode {
    OK = 0,
    FAIL = 1,
    TOKEN_EXPIRED = 101,
    TOKEN_INVALID = 102,
    EMAIL_OR_PHONE_IS_BUSY = 150,
    DATA_IS_INCOMPLETE = 151,
    INVALID_LOGIN_OR_PASSWORD = 160,
    CONFIGURATION_ERROR = 501,
    CONNECTION_ERROR = 502
}
export default ResultCode;
