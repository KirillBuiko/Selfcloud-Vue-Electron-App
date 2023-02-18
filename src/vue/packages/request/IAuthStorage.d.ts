import type { RefreshData } from "@vue/Objects";
import type ResultCode from "@vue/ResultCode";
export default interface IAuthStorage {
    setAccessToken(token: string): ResultCode;
    setUpdateToken(token: string): ResultCode;
    setImprint(key: string | undefined): ResultCode;
    getTokenData(): RefreshData;
}
