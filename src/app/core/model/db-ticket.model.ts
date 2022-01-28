export class DbTicket {
    id?: number;
    instance?: string;
    idTicketType?: number;
    objTicketType?: {
        id?: number;
        idService?: number;
        code?: string;
        name?: string;
        idParent?: number;
        formName?: string;
    };
    userCode?: string;
    userName?: string;
    requesterCode?: string;
    requesterName?: string;
    requesterArea?: string;
    idApplication?: number;
    objApplication?: {
        id?: number;
        idBusinessUnit?: number;
        name?: string;
        epmCode?: string;
        paymentSystem?: true;
        cia?: true;
        mobile?: true;
        other?: true;
        internetBanking?: true;
        abm?: true;
        contactCenter?: true;
        branches?: true;
        others?: true;
        logicalDelete?: number;
        objRelationLocation?: {
            idRegion?: number;
            desRegion?: string;
            idCountry?: number;
            desCountry?: string;
            idEntity?: number;
            desEntity?: string;
            idBusinessUnit?: number;
            desBusinessUnit?: string;
        }
    };
    requestDate?: Date;
    attentionDate?: Date;
    closeDate?: Date;
    idStatus?: number;
    progress?: number;
    idExecutor?: number;
    idParent?: number;
    idPriority?: number;
    idService?: number;
    sla?: Date;
    data?: string;
    objActionPlans?: ObjActionPlan[];
    objComments?: ObjComment[];
    objFiles?: ObjFile[];
    objLocation?: ObjLocation[];
    aditionalComments?: string;
    actionPlans?: any[];
    constructor() {
    }
}

export class ActionPlan {
    id?: number;
    index: number;
    idTicket?: number;
    data: string;
    idExecutor?: number;
}

export class TicketData {
    datos: any;
    actionPlans: any;
}

export class ObjLocation {
    id?: number;
    idTicket?: number;
    regionId?: number;
    countryId?: number;
    entityId?: number;
    value?: string;
}


export class ObjComment {
    id?: number;
    idTicket?: number;
    userName?: string;
    commentDate?: Date;
    comment?: string;
}

export class ObjFile {
    id?: number;
    idTicket?: number;
    fileData: string;
    name: string;
    ticket?: string;
    nameControl: string;
}

export class ObjActionPlan {
    id?: number;
    idTicket?: number;
    idTicketType?: number;
    data?: string;
    idExecutor?: number;
    executorName?: string;
    idStatus?: number;
    progress?: number;
    healtStatus?: number;
    closeDate?: Date;
}