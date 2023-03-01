import type IRequestHandler from "./IRequestHandler";
import type IStorageHandler from "./IStorageHandler";

export default abstract class AbstractRequest{
    requestHandler: IRequestHandler;

    protected constructor(requestHandler: IRequestHandler) {
        this.requestHandler = requestHandler;
    }

    getStorageHandler(): IStorageHandler{
        return this.requestHandler.getStorageHandler();
    }
}
