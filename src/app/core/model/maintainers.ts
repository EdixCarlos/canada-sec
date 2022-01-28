/*----------GENERALS----------------*/
export interface Data{
    id: number;
    idservice: number;
    service: string;
    name: string;  
}

export interface DataMaintainer{
    id: number,
    type: number,
    description: string,
    value: string,
    idParent: number,
    typeParent: number,
}
export interface DataPvt{
    id: number;
    value: string;
}
export interface GeneralPvt{
    id: number;
    value: string;
}
export interface Parameter{
    id: number,
    idParameterTable: number,
    tableName: string,
    idField: number,
    fieldDescription: string,
}

/*----------SERVICES----------------*/

export interface ServicePvt{
    id: number;
    description: string;    
}
export interface ServiceUpdate{
    id: number;
    value: string;    
}
export interface ServiceMaintainer{
    id: number;
    idService: number;
    type: number;
    description: string;
    idParent: number;
}
export interface Child{
    id: number;
    type: number;
    child: number;
}
/*----------SLA----------------*/

export interface SlaPvt{
    id: number;
    name: string;
}
export interface SlaMaintainer{
    id: number;
    idService: number;
    type: number;
    description: string;
    value: string;
    logicalDelete: number;
    idUnitySla: number;    
}

export interface SlaUpdate{
    id: number;
    description: string;
    value: string;
    idUnitySla: number;
}

/*----------MA----------------*/

export interface ModuleAppPvt{
    id: number;
    idField: number;    
    fieldDescription: string;
}

export interface ModuleAppTmp{
    id: number;
    type: number;
    value: string;
}

export interface appMaintainer{
    id: number;
    type: number;
    description: string;
    idParent: number;
    typeParent: number;
}

export interface ModuleAppMaintainer{
    id: number;
    idBusinessUnit: number;    
    name: string;
    epmCode: string;
    paymentSystem: boolean;
    cia: boolean;
    mobile: boolean;
    other: boolean;
    internetBanking: boolean;
    abm: boolean;
    contactCenter: boolean,
    branches: boolean;
    others: boolean;    
    objRelationLocation: {
      idRegion: number,
      desRegion: string,
      idCountry: number,
      desCountry: string,
      idEntity: number,
      desEntity: string;
      idBusinessUnit: number;
      desBusinessUnit: string;
    }
}

export interface ModuleAppUpdate{
    id: number;
    idBusinessUnit: number;    
    name: string;
    epmCode: string;
    paymentSystem: boolean;
    cia: boolean;
    mobile: boolean;
    other: boolean;
    internetBanking: boolean;
    abm: boolean;
    contactCenter: boolean,
    branches: boolean;
    others: boolean;
    logicalDelete: number
}

/*----------Relation----------------*/

export interface RelationPvt{
    id: number;
    type: number;
    description: string;
    value: string;    
    idParent: number;
    typeParent: number;    
}

export interface RelationsMaintainer{
    id: number;
    type: number;
    description: string;
    value: string;
    idParent: number;
    typeParent: number;
    logicalDelete: number
}

/*----------Requester----------------*/
export interface RequesterMaintainer{
    id: number;
    idService : number;      
    name: string;
    state: number;    
    executorCode: string; 
    service?: string;
}