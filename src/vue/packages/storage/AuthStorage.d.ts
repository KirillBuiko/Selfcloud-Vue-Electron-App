import AbstractStorage from "@vue/packages/StorageHandler/AbstractStorage";
import IAuthStorage from "@vue/packages/request/IAuthStorage";
import IStorageHandler from "@vue/packages/request/IStorageHandler";
import { ResultCode, TokenData } from "@vue/Objects";
export default class AuthStorage extends AbstractStorage implements IAuthStorage {
    constructor(storageHandler: IStorageHandler);
    getTokenData(): TokenData;
    setAccessToken(token: string): ResultCode;
    setImprint(token: string | undefined): ResultCode;
    setUpdateToken(token: string): ResultCode;
}
