import AbstractRequest from "@/packages/request/AbstractRequest";
import RequestHandlerClass from "@/packages/request/RequestHandlerClass";
import type {LoginData, RegData, ResponseData, RefreshData} from "@/Objects";
import ResultCode from "@/ResultCode";

export default class AccountRequestClass extends AbstractRequest{
    REQUEST_PREFIX = '/request'

    constructor() {
        super(new RequestHandlerClass());
    }

    async loginPassword(loginData: LoginData): Promise<ResponseData<object>>{
        const response = await this.requestHandler.makeRequest<RefreshData>({
            // TODO: set URL
            url: this.REQUEST_PREFIX + "/login/",
            method: "POST",
            body: loginData,
        });
        console.log(response);
        if(response.code == ResultCode.OK && response.result !== undefined){
            const tokens = response.result;
            this.requestHandler.setTokens(tokens);
        }
        return response;
    }

    async loginToken(): Promise<ResponseData<object>>{
        const response = await this.requestHandler.makeRequest<RefreshData>({
            // TODO: set URL
            url: this.REQUEST_PREFIX + "/loginToken/"
        });
        console.log(response);
        if(response.code == ResultCode.OK && response.result !== undefined){
            const tokens = response.result;
            this.requestHandler.setTokens(tokens);
        }
        return response;
    }

    async registration(regData: RegData): Promise<ResponseData<object>>{
        return await this.requestHandler.makeRequest({
            url: this.REQUEST_PREFIX + "/registration/",
            method: "POST",
            body: regData,
        });
    }

    async passwordChange(passwords: {oldPassword: string, newPassword: string}): Promise<ResponseData<object>>{
        return await this.requestHandler.makeRequest({
            url: "/",
            method: "POST",
            body: passwords,
        });
    }

    async deleteAccount(): Promise<ResponseData<object>>{
        this.requestHandler.setTokens({access: "", refresh: ""});
        return await this.requestHandler.makeRequest({
            url: "",
        });
    }

    async logout(): Promise<ResponseData<object>>{
        this.requestHandler.setTokens({access: "", refresh: ""});
        return await this.requestHandler.makeRequest({
            url: this.REQUEST_PREFIX + "/log_out/",
        });
    }
}
