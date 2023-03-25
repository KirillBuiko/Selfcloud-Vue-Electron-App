import {defineStore} from "pinia";
import type IAuthStorage from "@/packages/request/IAuthStorage";
import type {RefreshData} from "@/types/Objects";
import type {ResultCode} from "@/types/ResultCode";

export const useAuthStore = defineStore<"authStore", object, {[ind: string]: any}, IAuthStorage>("authStore", {
    actions:{
        getTokenData(): RefreshData {
            return {} as RefreshData;
        },
        setAccessToken(token: string): ResultCode {
            return {} as ResultCode;
        },
        setImprint(key: string | undefined): ResultCode {
            return {} as ResultCode;
        },
        setUpdateToken(token: string): ResultCode {
            return {} as ResultCode;
        },
        setTokenData(tokens: RefreshData) {
            this.setAccessToken(tokens.access);
            this.setImprint(tokens.fingerprint);
            this.setUpdateToken(tokens.refresh);
        }
    }
});