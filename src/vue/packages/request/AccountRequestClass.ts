import AbstractRequest from "@/packages/request/AbstractRequest";
import type {LoginData, RegData, ResponseData, RefreshData} from "@/types/Objects";
import {ResultCode} from "@/types/ResultCode";
import type {$RequestHandler} from "@/packages/request/IRequestHandler";

export default class AccountRequestClass extends AbstractRequest{
    REQUEST_PREFIX = '/request'

    constructor(private S: $RequestHandler) {
        super();
    }

    async loginPassword(loginData: LoginData): Promise<ResponseData<object>>{
        const response = await this.S.requestHandler.makeRequest<RefreshData>({
            // TODO: set URL
            url: this.REQUEST_PREFIX + "/login/",
            method: "POST",
            body: loginData,
        });
        console.log(response);
        if(response.code == ResultCode.OK && response.result !== undefined){
            const tokens = response.result;
            this.S.requestHandler.setTokens(tokens);
        }
        return response;
    }

    async loginToken(): Promise<ResponseData<object>>{
        const response = await this.S.requestHandler.makeRequest<RefreshData>({
            // TODO: set URL
            url: this.REQUEST_PREFIX + "/loginToken/"
        });
        console.log(response);
        if(response.code == ResultCode.OK && response.result !== undefined){
            const tokens = response.result;
            this.S.requestHandler.setTokens(tokens);
        }
        return response;
    }

    async registration(regData: RegData): Promise<ResponseData<object>>{
        return await this.S.requestHandler.makeRequest({
            url: this.REQUEST_PREFIX + "/registration/",
            method: "POST",
            body: regData,
        });
    }

    async passwordChange(passwords: {oldPassword: string, newPassword: string}): Promise<ResponseData<object>>{
        return await this.S.requestHandler.makeRequest({
            url: "/",
            method: "POST",
            body: passwords,
        });
    }

    async deleteAccount(): Promise<ResponseData<object>>{
        this.S.requestHandler.setTokens({access: "", refresh: ""});
        return await this.S.requestHandler.makeRequest({
            url: "",
        });
    }

    async logout(): Promise<ResponseData<object>>{
        this.S.requestHandler.setTokens({access: "", refresh: ""});
        return await this.S.requestHandler.makeRequest({
            url: this.REQUEST_PREFIX + "/log_out/",
        });
    }
}

export type $AccountRequestActions = {accountRequestActions: AccountRequestClass}
