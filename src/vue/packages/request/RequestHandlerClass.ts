import type IRequestHandler from "@/packages/request/IRequestHandler";
import type {RequestData, ResponseData, RefreshData, AccessData} from "@/types/Objects";
import axios, {AxiosError} from "axios";
import type {AxiosInstance, AxiosRequestConfig} from "axios"
import {ResultCode} from "@/types/ResultCode";
import type {$AuthStore} from "@/packages/request/IAuthStorage";

export default class RequestHandlerClass implements IRequestHandler{
    axiosInst: AxiosInstance

    constructor(private D: $AuthStore) {
        this.axiosInst = axios.create({
            baseURL: 'http://localhost:35000/',
            headers: {
                Accept: "*/*"
            },
            withCredentials: true
        })
    }

    async makeRequest<K>(request: RequestData, refresh = false):
        Promise<ResponseData<K>> {
        const {url, body = {}, method = "GET", responseType = "json"} = request;

        const config: AxiosRequestConfig = {
            responseType: responseType
        }
        const requestBody: AccessData & {refresh?: string} = {...this.D.authStore.getTokenData(), ...body}
        if(!refresh) requestBody.refresh = undefined;

        console.log(requestBody);

        if (method == "GET") config.params = requestBody;
        const req = method === "GET" ? this.axiosInst.get<ResponseData<K>>(url, config) :
            this.axiosInst.post<ResponseData<K>>(url, requestBody, config)

        try {
            const response = await req;
            console.log(response)
            if(response.data.code == ResultCode.OK)
                return response.data;

            // check token expired and update
            if (response.data.code === ResultCode.TOKEN_EXPIRED){
                const updRes = await this.updateToken();
                if(updRes.code !== ResultCode.OK)
                    return {code: updRes.code};
                return await this.makeRequest<K>(request)
            }
            return response.data;
        }
        catch(err){
            if(err instanceof AxiosError) {
                if (err.request) {
                    return {code: ResultCode.CONNECTION_ERROR};
                } else {
                    return {code: ResultCode.CONFIGURATION_ERROR};
                }
            }
            return {code: ResultCode.FAIL};
        }
    }

    setTokens(tokens: RefreshData): void {
        this.D.authStore.setTokenData(tokens);
    }

    async updateToken(): Promise<ResponseData<object>> {
        const request: RequestData = {url: "/request/update_all_tokens"};
        const response = await this.makeRequest<RefreshData>(request, true);
        if(response.code == ResultCode.OK && response.result !== undefined){
            const tokens = response.result;
            this.setTokens(tokens);
        }
        return response;
    }
}
