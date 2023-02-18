import type { RefreshData } from "@vue/Objects";
import type IAuthStorage from "@vue/packages/request/IAuthStorage";
import type IStorageHandler from "@vue/packages/request/IStorageHandler";
import ResultCode from "../../ResultCode";
export default class TokenHandler {
    authStorage: IAuthStorage;
    constructor(storageHandler: IStorageHandler);
    setTokens(tokens: RefreshData): ResultCode;
    getTokens(): RefreshData | undefined;
}
