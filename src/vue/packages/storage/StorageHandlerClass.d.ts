import IStorageHandler from "@vue/packages/request/IStorageHandler";
import { ResultCode } from "@vue/Objects";
export default class StorageHandlerClass implements IStorageHandler {
    getValue(key: string): string;
    setValue(key: string, value: string): ResultCode;
}
