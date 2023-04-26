import type {ResultCode} from "@/types/ResultCode";

export default interface IStorageHandler {
    getValue(key: string): string;

    setValue(key: string, value: string): ResultCode;
}
