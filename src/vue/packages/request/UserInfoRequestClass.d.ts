import AbstractRequest from "@vue/packages/request/AbstractRequest";
import type IRequestHandler from "@vue/packages/request/IRequestHandler";
import type { ResponseData, UserData } from "@vue/Objects";
export default class UserInfoRequestClass extends AbstractRequest {
    constructor(requestHandler: IRequestHandler);
    getUserInfo(): Promise<ResponseData<UserData>>;
    updateUserInfo(userData: UserData): Promise<ResponseData<object>>;
}
