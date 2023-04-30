import AbstractRequest from "@/packages/request/AbstractRequest";
import type {LoginData, RefreshData, RegData, ResponseData} from "@/types/Objects";
import {ResultCode} from "@/types/ResultCode";
import type {$RequestHandler} from "@/packages/request/IRequestHandler";
import {Configs} from "@/Configs";
import type {$ConfigStore} from "@/stores/configStore";

export default class AccountRequestClass extends AbstractRequest {
    constructor(private deps: $RequestHandler & $ConfigStore) {
        super();
    }

    async loginPassword(loginData: LoginData): Promise<ResponseData<object>> {
        const response = await this.deps.requestHandler.makeRequest<RefreshData>({
            // TODO: set URL
            url: Configs.REQUEST_PREFIX + "/login_password",
            method: "POST",
            body: loginData,
        });
        if (response.code == ResultCode.OK && response.result !== undefined) {
            this.deps.configStore.setIsLogin(true);
            this.deps.requestHandler.setTokens(response.result);
        } else {
            this.deps.configStore.setIsLogin(false);
        }
        return response;
    }

    async loginToken(): Promise<ResponseData<object>> {
        const response = await this.deps.requestHandler.makeRequest<RefreshData>({
            // TODO: set URL
            url: Configs.REQUEST_PREFIX + "/login_token",
            method: "POST"
        });
        if (response.code == ResultCode.OK && response.result !== undefined) {
            this.deps.configStore.setIsLogin(true);
            const tokens = response.result;
            this.deps.requestHandler.setTokens(tokens);
        } else {
            this.deps.configStore.setIsLogin(false);
        }
        return response;
    }

    async registration(regData: RegData): Promise<ResponseData<object>> {
        return await this.deps.requestHandler.makeRequest({
            url: Configs.REQUEST_PREFIX + "/registration",
            method: "POST",
            body: regData,
        });
    }

    async passwordChange(passwords: { oldPassword: string, newPassword: string }): Promise<ResponseData<object>> {
        return await this.deps.requestHandler.makeRequest({
            url: "/",
            method: "POST",
            body: passwords,
        });
    }

    async deleteAccount(): Promise<ResponseData<object>> {
        this.deps.requestHandler.setTokens({access: "", refresh: ""});
        return await this.deps.requestHandler.makeRequest({
            url: "",
        });
    }

    async logout(): Promise<ResponseData<object>> {
        this.deps.requestHandler.setTokens({access: "", refresh: ""});
        this.deps.configStore.setIsLogin(false);
        return await this.deps.requestHandler.makeRequest({
            url: Configs.REQUEST_PREFIX + "/logout",
        });
    }
}

export type $AccountRequestActions = { accountRequestActions: AccountRequestClass }
