import { RequestType } from "./request-type";

export interface SubService {
    id: number,
    name: string,
    requestTypeList?: RequestType[],
    code: string
}