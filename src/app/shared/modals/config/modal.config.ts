export interface ModalConfiguration {
    commonConfig(): void;
    buildModalConfig(size: string, data?:any): any;
}