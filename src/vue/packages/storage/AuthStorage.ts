import AbstractStorage from "@vue/packages/StorageHandler/AbstractStorage";
import IAuthStorage from "@vue/packages/request/IAuthStorage";
import IStorageHandler from "@vue/packages/request/IStorageHandler";
import {ResultCode, TokenData} from "@vue/Objects";

export default class AuthStorage extends AbstractStorage implements IAuthStorage{
    constructor(storageHandler: IStorageHandler) {
        super(storageHandler);
    }

    getTokenData(): TokenData {
        return {
            access_token: this.storageHandler.getValue('accessToken'),
            update_token: this.storageHandler.getValue('updateToken'),
            imprint_token: this.storageHandler.getValue('imprintToken')
        }
    }

    setAccessToken(token: string): ResultCode {
        return this.storageHandler.setValue('accessToken', token);
    }

    setImprint(token: string | undefined): ResultCode {
        if(token === undefined)
            return ResultCode.OK;
        return this.storageHandler.setValue('imprintToken', token);
    }

    setUpdateToken(token: string): ResultCode {
        return this.storageHandler.setValue('updateToken', token);
    }
}
