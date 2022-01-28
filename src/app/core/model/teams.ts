import { Country } from "./country";
import { ObjFile } from "./db-ticket.model";

export interface Ip360Team {
    country: Country,
    hostName: string,
    ip: string,
    epmCode: string,
    applicationName: string,
    score?: string,
    riskLevel?: any,
    requesterResult?: any,
    report?: ObjFile
}

export interface SerHarTeam {
    country: Country,
    hostName: string,
    ip: string,
    operatingSystem: string,
    serverType: string,
    domain: string,
    clasification: string,
    passwordAuth: string,
    epmCode: string,
    applicationName: string
}