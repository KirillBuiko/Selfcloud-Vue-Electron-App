import type IRequestHandler from "@vue/packages/request/IRequestHandler";
import type {RequestData, ResponseData, RefreshData} from "@vue/Objects";
import TokenHandler from "@vue/packages/request/TokenHandler";
import type IStorageHandler from "@vue/packages/request/IStorageHandler";
import StorageHandlerClass from "@vue/packages/storage/StorageHandlerClass";
import axios, {AxiosError} from "axios";
import type {AxiosInstance, AxiosRequestConfig} from "axios"
import ResultCode from "@vue/ResultCode";

export default class requestClass implements IRequestHandler{
    tokenHandler: TokenHandler
    storageHandler: IStorageHandler
    axiosInst: AxiosInstance

    constructor() {
        this.storageHandler = new StorageHandlerClass()
        this.tokenHandler = new TokenHandler(this.storageHandler)
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
        const requestBody: RefreshData = {...this.tokenHandler.getTokens(), ...body}
        if(!refresh) requestBody.refresh = "";


        console.log(requestBody);

        let req;
        if (method == "GET") {
            config.params = requestBody;
            req = this.axiosInst.get<K>(url, config)
        }
        if (method == "POST") {
            req = this.axiosInst.post<K>(url, requestBody, config)
        }
        if (!req)
            return {code: ResultCode.CONFIGURATION_ERROR}
        try {
            const result = await req;
            return {code: ResultCode.OK, result: result.data};
        }
        catch(err){
            if(err instanceof AxiosError) {
                if (err.response) {
                    console.log(err.response)
                    if ((err.response.data instanceof Object) && (err.response.data.jarvis_exception !== undefined)) {
                        // check token expired and update
                        if (err.response.data.jarvis_exception === ResultCode.TOKEN_EXPIRED){
                            const updRes = await this.updateToken();
                            if(updRes.code !== ResultCode.OK)
                                return {code: updRes.code, error: updRes.error};
                            return await this.makeRequest<K>(request)
                        }
                        return {code: err.response.data.jarvis_exception, error: err.response.data};
                    }
                    return {code: ResultCode.FAIL, error: err.response.statusText};
                }else if (err.request) {
                    return {code: ResultCode.CONNECTION_ERROR, error: err.request};
                } else {
                    return {code: ResultCode.CONFIGURATION_ERROR, error: err.message};
                }
            }
            return {code: ResultCode.FAIL, error: "Unknown error"};
        }
    }

    setTokens(tokens: RefreshData): ResultCode {
        return this.tokenHandler.setTokens(tokens);
    }

    getStorageHandler(): IStorageHandler {
        return this.storageHandler;
    }

    async updateToken(): Promise<ResponseData<object>> {
        const request: RequestData = {url: "/update/update_all_tokens"};
        const response = await this.makeRequest<RefreshData>(request, true);
        if(response.code == ResultCode.OK && response.result !== undefined){
            const tokens = response.result;
            this.setTokens(tokens);
        }
        return response;
    }
}
