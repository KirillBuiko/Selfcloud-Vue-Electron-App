import type {RefreshData, RequestData, ResponseData} from "../../Objects";
import type IStorageHandler from "./IStorageHandler";

export default interface IRequestHandler{
    makeRequest<K>(request: RequestData): Promise<ResponseData<K>>
    getStorageHandler(): IStorageHandler
    setTokens(token: RefreshData): void
}
