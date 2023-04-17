import AbstractRequest from "@/packages/request/AbstractRequest";
import type IRequestHandler from "@/packages/request/IRequestHandler";
import type {ResponseData, UserData} from "@/types/Objects";
import type {$RequestHandler} from "@/packages/request/IRequestHandler";
import AccountRequestClass from "@/packages/request/AccountRequestClass";

export default class UserInfoRequestClass extends AbstractRequest{
    constructor(private D: $RequestHandler) {
        super();
    }

    async getUserInfo(): Promise<ResponseData<UserData>>{
        // TODO: set URL
        return await this.D.requestHandler.makeRequest<UserData>({
            url: "",
            method: "POST"
        });
    }

    async updateUserInfo(userData: UserData): Promise<ResponseData<object>>{
        return await this.D.requestHandler.makeRequest({
            url: "",
            method: "POST",
            body: userData
        });
    }
}

export type $UserInfoRequestActions = {userInfoRequestActions: UserInfoRequestClass}
