import type ResultCode from "@vue/ResultCode";
export default interface IStorageHandler {
    getValue(key: string): string;
    setValue(key: string, value: string): ResultCode;
}
