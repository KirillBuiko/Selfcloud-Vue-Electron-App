import type IRequestHandler from "@/packages/request/IRequestHandler";
import type IStorageHandler from "@/packages/request/IStorageHandler";

export default abstract class AbstractRequest{
    requestHandler: IRequestHandler;

    protected constructor(requestHandler: IRequestHandler) {
        this.requestHandler = requestHandler;
    }

    getStorageHandler(): IStorageHandler{
        return this.requestHandler.getStorageHandler();
    }
}
