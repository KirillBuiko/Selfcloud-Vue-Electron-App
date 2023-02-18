import type IRequestHandler from "@vue/packages/request/IRequestHandler";
import type { RequestData, ResponseData, RefreshData } from "@vue/Objects";
import TokenHandler from "@vue/packages/request/TokenHandler";
import type IStorageHandler from "@vue/packages/request/IStorageHandler";
import type { AxiosInstance } from "axios";
import ResultCode from "@vue/ResultCode";
export default class requestClass implements IRequestHandler {
    tokenHandler: TokenHandler;
    storageHandler: IStorageHandler;
    axiosInst: AxiosInstance;
    constructor();
    makeRequest<K>(request: RequestData, refresh?: boolean): Promise<ResponseData<K>>;
    setTokens(tokens: RefreshData): ResultCode;
    getStorageHandler(): IStorageHandler;
    updateToken(): Promise<ResponseData<object>>;
}
