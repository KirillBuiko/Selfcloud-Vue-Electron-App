import AbstractRequest from "@/packages/request/AbstractRequest";
import type IRequestHandler from "@/packages/request/IRequestHandler";
import type {ResponseData, UserData} from "@/Objects";

export default class UserInfoRequestClass extends AbstractRequest{
    constructor(requestHandler: IRequestHandler) {
        super(requestHandler);
    }

    async getUserInfo(): Promise<ResponseData<UserData>>{
        // TODO: set URL
        return await this.requestHandler.makeRequest<UserData>({
            url: "",
            method: "POST"
        });
    }

    async updateUserInfo(userData: UserData): Promise<ResponseData<object>>{
        return await this.requestHandler.makeRequest({
            url: "",
            method: "POST",
            body: userData
        });
    }
}
