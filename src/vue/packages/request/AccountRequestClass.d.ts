import AbstractRequest from "@vue/packages/request/AbstractRequest";
import type IRequestHandler from "@vue/packages/request/IRequestHandler";
import type { LoginData, RegData, ResponseData } from "@vue/Objects";
export default class AccountRequestClass extends AbstractRequest {
    constructor(requestHandler: IRequestHandler);
    loginPassword(loginData: LoginData): Promise<ResponseData<object>>;
    loginToken(): Promise<ResponseData<object>>;
    registration(regData: RegData): Promise<ResponseData<object>>;
    passwordChange(passwords: {
        oldPassword: string;
        newPassword: string;
    }): Promise<ResponseData<object>>;
    deleteAccount(): Promise<ResponseData<object>>;
    logout(): Promise<ResponseData<object>>;
}
