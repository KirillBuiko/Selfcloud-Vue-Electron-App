import type {ResultCode} from "@/ResultCode";

export default interface IStorageHandler{
    getValue(key: string): string;
    setValue(key: string, value: string): ResultCode;
}
