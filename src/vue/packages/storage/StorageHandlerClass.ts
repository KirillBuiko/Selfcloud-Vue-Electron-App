import IStorageHandler from "@vue/packages/request/IStorageHandler";
import {ResultCode} from "@vue/Objects";

export default class StorageHandlerClass implements IStorageHandler{

    // TODO: make storage

    getValue(key: string): string {
        return "";
    }

    setValue(key: string, value: string): ResultCode {
        return ResultCode.OK;
    }
}
