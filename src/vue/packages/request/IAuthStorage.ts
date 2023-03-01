import type {RefreshData} from "../../Objects";
import type {ResultCode} from "../../ResultCode";

export default interface IAuthStorage{
    setAccessToken(token: string): ResultCode,
    setUpdateToken(token: string): ResultCode,
    setImprint(key: string | undefined): ResultCode,
    getTokenData(): RefreshData,
}
