import type IStorageHandler from "../request/IStorageHandler";
import {ResultCode} from "../../ResultCode";

export default class StorageHandlerClass implements IStorageHandler{

    // TODO: make storage

    getValue(key: string): string {
        return "";
    }

    setValue(key: string, value: string): ResultCode {
        return ResultCode.OK;
    }
}
