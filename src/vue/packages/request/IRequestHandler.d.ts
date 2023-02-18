import type { RefreshData, RequestData, ResponseData } from "@vue/Objects";
import type IStorageHandler from "@vue/packages/request/IStorageHandler";
export default interface IRequestHandler {
    makeRequest<K>(request: RequestData): Promise<ResponseData<K>>;
    getStorageHandler(): IStorageHandler;
    setTokens(token: RefreshData): void;
}
