import type IRequestHandler from "@vue/packages/request/IRequestHandler";
import type IStorageHandler from "@vue/packages/request/IStorageHandler";
export default abstract class AbstractRequest {
    requestHandler: IRequestHandler;
    protected constructor(requestHandler: IRequestHandler);
    getStorageHandler(): IStorageHandler;
}
