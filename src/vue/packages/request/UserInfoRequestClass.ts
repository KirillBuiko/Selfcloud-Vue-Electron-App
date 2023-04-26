import AbstractRequest from "@/packages/request/AbstractRequest";
import type {ResponseData, UserData} from "@/types/Objects";
import type {$RequestHandler} from "@/packages/request/IRequestHandler";

export default class UserInfoRequestClass extends AbstractRequest {
    constructor(private deps: $RequestHandler) {
        super();
    }

    async getUserInfo(): Promise<ResponseData<UserData>> {
        // TODO: set URL
        return await this.deps.requestHandler.makeRequest<UserData>({
            url: "",
            method: "POST"
        });
    }

    async updateUserInfo(userData: UserData): Promise<ResponseData<object>> {
        return await this.deps.requestHandler.makeRequest({
            url: "",
            method: "POST",
            body: userData
        });
    }
}

export type $UserInfoRequestActions = { userInfoRequestActions: UserInfoRequestClass }
