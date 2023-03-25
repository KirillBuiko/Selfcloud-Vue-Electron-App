import type IRequestHandler from "@/packages/request/IRequestHandler";

export default abstract class AbstractRequest{
    requestHandler: IRequestHandler;

    protected constructor(requestHandler: IRequestHandler) {
        this.requestHandler = requestHandler;
    }
}
