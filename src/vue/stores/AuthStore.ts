import {useLocalStorage} from "@vueuse/core";
import type IAuthStorage from "@/packages/request/IAuthStorage";
import type {RefreshData} from "@/types/Objects";

export class AuthStore implements IAuthStorage {
    access = useLocalStorage("access", "");
    refresh = useLocalStorage("refresh", "");
    fingerprint = useLocalStorage("fingerprint", "");

    getTokenData(): RefreshData {
        return {} as RefreshData;
    }
    setAccessToken(token: string): void {
        this.access.value = token;
    }
    setFingerprint(key: string): void {
        this.fingerprint.value = key;
    }
    setRefreshToken(token: string): void {
        this.refresh.value = token;
    }
    setTokenData(tokens: RefreshData) {
        if (tokens.fingerprint)
            this.setFingerprint(tokens.fingerprint);
        if(!navigator.cookieEnabled) {
            if (tokens.access)
                this.setAccessToken(tokens.access);
            if (tokens.refresh)
                this.setRefreshToken(tokens.refresh);
        }
    }
}
