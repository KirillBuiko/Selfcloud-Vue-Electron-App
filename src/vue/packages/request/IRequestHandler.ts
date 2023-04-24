import type {RefreshData, RequestData, ResponseData} from "@/types/Objects";

export default interface IRequestHandler {
    makeRequest<K>(request: RequestData): Promise<ResponseData<K>>

    setTokens(token: RefreshData): void
}

export type $RequestHandler = { requestHandler: IRequestHandler }