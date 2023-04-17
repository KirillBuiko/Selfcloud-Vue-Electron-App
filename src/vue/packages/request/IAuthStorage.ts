import type {RefreshData} from "@/types/Objects";
import type {ResultCode} from "@/types/ResultCode";

export default interface IAuthStorage{
    setAccessToken(token: string): ResultCode,
    setUpdateToken(token: string): ResultCode,
    setImprint(key: string | undefined): ResultCode,
    setTokenData(tokens: RefreshData): void,
    getTokenData(): RefreshData,
}

export type $AuthStore = {authStore: IAuthStorage}
