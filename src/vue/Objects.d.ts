import type ResultCode from "@vue/ResultCode";
import type { ResponseType } from "axios";
export declare abstract class AbstractData {
}
export interface RequestData extends AbstractData {
    readonly url: string;
    readonly method?: "POST" | "GET";
    readonly body?: object | AbstractData;
    readonly responseType?: ResponseType;
}
export interface ResponseData<K> extends AbstractData {
    code: ResultCode;
    result?: K;
    error?: string;
}
export interface AccessData {
    access: string;
    fingerprint?: string;
}
export interface RefreshData extends AccessData {
    refresh: string;
}
export interface LoginData {
    login: string;
    password: string;
    fingerprint?: string;
}
export interface UserData {
    email: string;
    phone: string;
    name?: string;
    surname?: string;
}
export interface RegData extends UserData {
    password: string;
}
