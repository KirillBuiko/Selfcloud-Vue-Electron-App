import AbstractStorage from "@/packages/storage/AbstractStorage";
import type IAuthStorage from "@/packages/request/IAuthStorage";
import type IStorageHandler from "@/packages/request/IStorageHandler";
import type {RefreshData} from "@/Objects";
import {ResultCode} from "@/ResultCode";

export default class AuthStorage extends AbstractStorage implements IAuthStorage{
    constructor(storageHandler: IStorageHandler) {
        super(storageHandler);
    }

    getTokenData(): RefreshData {
        return {
            access: this.storageHandler.getValue('accessToken'),
            refresh: this.storageHandler.getValue('refreshToken'),
            fingerprint: this.storageHandler.getValue('fingerprint')
        }
    }

    setAccessToken(token: string): ResultCode {
        return this.storageHandler.setValue('accessToken', token);
    }

    setImprint(token: string | undefined): ResultCode {
        if(token === undefined)
            return ResultCode.OK;
        return this.storageHandler.setValue('refreshToken', token);
    }

    setUpdateToken(token: string): ResultCode {
        return this.storageHandler.setValue('fingerprint', token);
    }
}
