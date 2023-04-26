import type {RefreshData} from "@/types/Objects";
import type {Ref} from "vue";

export default interface IAuthStorage {
    access: Ref<string>,
    refresh: Ref<string>,
    fingerprint: Ref<string>,

    setAccessToken(token: string): void,

    setRefreshToken(token: string): void,

    setFingerprint(key: string | undefined): void,

    setTokenData(tokens: RefreshData): void,

    getTokenData(): RefreshData,
}

export type $AuthStore = { authStore: IAuthStorage }
