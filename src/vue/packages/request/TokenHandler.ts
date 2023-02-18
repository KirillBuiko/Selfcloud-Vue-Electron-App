import type {RefreshData} from "@vue/Objects";
import type IAuthStorage from "@vue/packages/request/IAuthStorage";
import AuthStorage from "@vue/packages/storage/AuthStorage";
import type IStorageHandler from "@vue/packages/request/IStorageHandler";
import ResultCode from "../../ResultCode";

export default class TokenHandler{
    authStorage: IAuthStorage

    constructor(storageHandler: IStorageHandler) {
        this.authStorage = new AuthStorage(storageHandler);
    }

    setTokens(tokens: RefreshData): ResultCode{
        if(!navigator.cookieEnabled){
            this.authStorage.setAccessToken(tokens.access);
            this.authStorage.setUpdateToken(tokens.refresh);
            this.authStorage.setImprint(tokens.fingerprint);
        }
        return ResultCode.OK
    }
    getTokens(): RefreshData | undefined{
        // TODO: add storage channel
        if(navigator.cookieEnabled)
            return undefined
        else return this.authStorage.getTokenData()
    }
}
