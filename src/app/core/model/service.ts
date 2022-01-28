import { SubService } from "./sub-service";

export interface Service {
    id: number,
    name: string,
    subServiceList?: SubService[],
    code: string
}