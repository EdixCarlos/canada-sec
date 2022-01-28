import { ModuleAppPvt } from "../core/model/maintainers";
import { SpsUser } from "../modules/auth/_models/sps-user.model";


export const UDF_CONTROL_TYPES: any[] = [
    {
        controlType: "text",
        label: "Texto",
        options: false,
        disabled: false
    },
    {
        controlType: "select",
        label: "Combo",
        options: true,
        disabled: false
    },
    {
        controlType: "checkbox",
        label: "Checkbox",
        options: false,
        disabled: false
    },
    {
        controlType: "radio",
        label: "Radio",
        options: true,
        disabled: false
    },
    {
        controlType: "textarea",
        label: "Area",
        options: false,
        disabled: false
    }
]

export const UDF_VALIDATION_TYPES: any[] = [
    {
        validationType: "required",
        label: "Requerido",
        requiresParam: false
    },
    {
        validationType: "minlength",
        label: "Caracteres mínimos",
        requiresParam: true
    },
    {
        validationType: "maxlength",
        label: "Caracteres máximos",
        requiresParam: true
    },
    {
        validationType: "min",
        label: "Valor mínimo",
        requiresParam: true
    },
    {
        validationType: "max",
        label: "Valor máximo",
        requiresParam: true
    },
    {
        validationType: "email",
        label: "Email",
        requiresParam: false
    },
    {
        validationType: "pattern",
        label: "Patrón regex",
        requiresParam: true
    }
]

export const SERVICES_TREE: any[] =
    [
        {
            "serviceName": "Vulnerability Management",
            "subServices": [
                {
                    "subServiceName": "App Vuln Scanning",
                    "subServiceTypes": [
                        {
                            "subServiceTypeName": "IP360 & CCM"
                        },
                        {
                            "subServiceTypeName": "WebInspect"
                        },
                        {
                            "subServiceTypeName": "Server Hardening"
                        }
                    ]
                },
                {
                    "subServiceName": "Vulnerability Assessment",
                    "subServiceTypes": []
                },
                {
                    "subServiceName": "False Positive Analysis",
                    "subServiceTypes": []
                },
                {
                    "subServiceName": "Vuln Remediations Agile Strategy",
                    "subServiceTypes": []
                },
                {
                    "subServiceName": "Monit Cyber Alerts and Closure",
                    "subServiceTypes": []
                },
                {
                    "subServiceName": "Consultas",
                    "subServiceTypes": []
                }
            ]
        },
        {
            "serviceName": "Advisory",
            "subServices": [
                {
                    "subServiceTypeName": "Threat risk assessment",
                    "abbreviation": "TRA"
                },
                {
                    "subServiceTypeName": "Vendor security assessment",
                    "abbreviation": "VSA"
                },
                {
                    "subServiceTypeName": "Mergers, acquisitions & divestitures",
                    "abbreviation": "MA&D"
                },
                {
                    "subServiceTypeName": "Risk Deviation/Acceptance Letters"
                },
                {
                    "subServiceTypeName": "Security Artifacts Peer Reviews"
                },
                {
                    "subServiceTypeName": "Firewall Port Requests",
                    "abbreviation": "FPR"
                }
            ]
        },
        {
            "serviceName": "Proyecto",
            "subServices": [
                {
                    "subServiceTypeName": "Proyectos"
                },
                {
                    "subServiceTypeName": "Projects Action Plan"
                }
            ]
        },
        {
            "serviceName": "Audits",
            "subServices": [
                {
                    "subServiceTypeName": "Audits Follow Up"
                },
                {
                    "subServiceTypeName": "Audits Action Plan"
                }
            ]
        }
    ];

export const SERVICES =
    [
        {
            "id": 1,
            "nombre": "Vulnerability Management",
            "code": "vulnerability-management"
        },
        {
            "id": 2,
            "nombre": "Advisory",
            "code": "advisory"
        },
        {
            "id": 3,
            "nombre": "Proyectos",
            "code": "proyectos"
        },
        {
            "id": 4,
            "nombre": "Audits",
            "code": "audits"
        }
    ]

export const SUB_SERVICES =
    [
        {
            "id": 1,
            "idServicio": 1,
            "nombre": "App Vuln Scanning",
            "formName": "AVS",
            "code": "app-vul-scan"
        },
        {
            "id": 2,
            "idServicio": 1,
            "nombre": "Vulnerability Assessment",
            "formName": "VA",
            "code": "vul-asm"
        },
        {
            "id": 3,
            "idServicio": 1,
            "nombre": "False Positive Analysis",
            "formName": "FPA",
            "code": "fal-pos-ana"
        },
        {
            "id": 4,
            "idServicio": 1,
            "nombre": "Vuln Remediations Agile Strategy",
            "formName": "VRAS",
            "code": "vul-rem-agi-str"
        },
        {
            "id": 5,
            "idServicio": 1,
            "nombre": "Monit Cyber Alerts and Closure",
            "formName": "MCA&C",
            "code": "mon-cyb-ale-clo"
        },
        {
            "id": 6,
            "idServicio": 2,
            "nombre": "TRA - Threat risk assessment ",
            "formName": "TRA",
            "code": "thr-ris-asm"
        },
        {
            "id": 7,
            "idServicio": 2,
            "nombre": "VSA - Vendor Security Assessment",
            "formName": "VSA",
            "code": "ven-sec-asm"
        },
        {
            "id": 8,
            "idServicio": 2,
            "nombre": "MA&D - Mergers, Acquisitions & Divestitures",
            "formName": "MA&D",
            "code": "mer-acq-div"
        },
        {
            "id": 9,
            "idServicio": 2,
            "nombre": "Risk Deviation/Acceptance Letters",
            "formName": "RDAL",
            "code": "ris-dev-acc-let"
        },
        {
            "id": 10,
            "idServicio": 2,
            "nombre": "Security Artifacts Peer Reviews",
            "formName": "SAPR",
            "code": "sec-art-pee-rev"
        },
        {
            "id": 11,
            "idServicio": 2,
            "nombre": "FPR - Firewall Port Requests",
            "formName": "FPR",
            "code": "fir-por-req"
        },
        {
            "id": 12,
            "idServicio": 3,
            "nombre": "Proyectos",
            "formName": "PROJ",
            "code": "project"
        },
        {
            "id": 26,
            "idServicio": 3,
            "nombre": "Projects Action Plan",
            "formName": "PAP",
            "code": "project"
        },
        {
            "id": 14,
            "idServicio": 4,
            "nombre": "Audits Follow Up",
            "formName": "AFU",
            "code": "aud-fol-up"
        },
        {
            "id": 28,
            "idServicio": 4,
            "nombre": "Audits Action Plan",
            "formName": "AAP",
            "code": "aud-fol-up"
        }
    ]

export const REQUEST_TYPES =
    [
        {
            "id": 1,
            "subServiceId": 1,
            "nombre": "IP360 & CCM",
            "formName": "ip360",
            "code": "ip360"
        },
        {
            "id": 2,
            "subServiceId": 1,
            "nombre": "WebInspect",
            "formName": "WI",
            "code": "web-ins"
        },
        {
            "id": 3,
            "subServiceId": 1,
            "nombre": "Server Hardening",
            "formName": "SH",
            "code": "ser-har"
        }
    ]

export const REGIONS =
    [
        {
            id: "1",
            description: "LATAM",
            code: "LA"
        },
        {
            id: "2",
            description: "EU",
            code: "EU"
        }
    ]

export const COUNTRIES =
    [
        {
            id: "1",
            regionId: "1",
            description: "Chile",
            code: "chi"
        },
        {
            id: "2",
            regionId: "1",
            description: "Colombia",
            code: "col"
        },
        {
            id: "3",
            regionId: "1",
            description: "Costa Rica",
            code: "cos"
        },
        {
            id: "4",
            regionId: "1",
            description: "Peru",
            code: "per"
        },
        {
            id: "5",
            regionId: "1",
            description: "Panama",
            code: "pan"
        },
        {
            id: "6",
            regionId: "1",
            description: "Uruguay",
            code: "uru"
        }
    ]



export const MOCK_USER: SpsUser = {
    domain: "PROFUTURO",
    user: "B0111019",
    name: "Triana Avila AelÃ-n",
    service: 1,
    area: 'Area 51',
    email: "",
    identityName: "PROFUTURO\\B0111019",
    spsErrorCode: null,
    spsErrorMessage: null,
    policies: [
        "GENERAL",
        "MANTENEDOR",
        "IS&C_Staff",
        "IS&C_Staff_Ejecutor"
    ]
}

export const MOCK_NULL_USER: SpsUser = {
    domain: null,
    user: null,
    name: null,
    area: null,
    service: null,
    email: null,
    identityName: null,
    spsErrorCode: null,
    spsErrorMessage: null,
    policies: [
    ]
}

//J
export const APPS =
    [
        { id: 1, idField: 1, fieldDescription: "Applications" },
        { id: 2, idField: 2, fieldDescription: "EPM Application" }
    ]

export const EPM_HEADERS =
{
    filter: 1,
    region: 2,
    country: 3,
    entity: 4,
    bs_unit: 5
}

export const PAGINATOR_DEFAULTS =
{
    pageSize: 5,
    pageSizeOptions: [5, 10, 15],
    pageSizeOptionsModal: [5, 7, 10],
    buttonfl: true
}

export const REGEX =
{
    regex_general: '^[a-zA-Z0-9 -_]*$',
    regex_alpha: '^[a-zA-Z -_]*$',
    regex_text: '^[a-zA-Z ]*$',
    regex_numeric_general: '^[0-9]*$',
    regex_numeric_special: '^[1-9]*$'
}

export const MinLength = {
    GENERAL: 1,
    EMAIL: 9,
    PASSWORD: 8,
    NUMBER: 1,
}

export const MaxLength = {
    GENERAL: 75,
    EMAIL: 100,
    PASSWORD: 50,
    NUMBER: 9,
    COMMENTS: 500,
    PORCENT: 3,
}

export const BUTTON_ACTIONS = {
    REASIGN: 'ESPERARACCIONEJECUTOR',
    REJECT: 'ESPERARACCIONEJECUTOR',
    RETURN: 'ESPERARACCIONEJECUTOR',
    START: 'ESPERARACCIONEJECUTOR',
    USER_RESPONSE: 'ESPERACONSULTAUSUARIO',
    ATTENDED: 'ESPERARCAMBIOS',
    SAVE: 'ESPERARCAMBIOS'
}

export enum TicketStatus {
    Initial = 0,
    Registered = 1,
    Rejected = 2,
    Approved = 3,
    Assigned = 4,
    InProcess = 5,
    Partial = 6,
    Attended = 7,
    Closed = 8,
    OpeIni = 9,
    Reassign = 10,
    CancelledByUser = 11,
    Returned = 12,
    Initialized = 101,
    Divided = 102,
    AdditionalAuthPending = 103,
    UserActionPending = 104,
    Cancelled = 105,
    AssignPending = 106,
    AnalystActionPending = 107,
    Escalate = 108,
    Updating = 404,
    SystemCancelled = 400
}

export const TicketType = {
    1: {
        id: 1,
        idService: 1,
        description: 'App Vuln Scanning',
    },
    2: {
        id: 2,
        idService: 1,
        description: 'Vulnerability Assessment',
    },
    3: {
        id: 3,
        idService: 1,
        description: 'False Positive Analysis',
    },
    4: {
        id: 4,
        idService: 1,
        description: 'Vuln Remediations Agile Strategy',
    },
    5: {
        id: 5,
        idService: 1,
        description: 'Monit Cyber Alerts and Closure',
    },
    6: {
        id: 6,
        idService: 2,
        description: 'TRA - Threat risk assessment',
    },
    7: {
        id: 7,
        idService: 2,
        description: 'VSA - Vendor Security Assessment',
    },
    8: {
        id: 8,
        idService: 2,
        description: 'MA&D - Mergers, Acquisitions & Divestitures',
    },
    9: {
        id: 9,
        idService: 2,
        description: 'Risk Deviation/Acceptance Letters',
    },
    10: {
        id: 10,
        idService: 2,
        description: 'Security Artifacts Peer Reviews',
    },
    11: {
        id: 11,
        idService: 2,
        description: 'FPR - Firewall Port Requests',
    },
    12: {
        id: 12,
        idService: 3,
        description: 'Proyectos',
    },
    // 13: { 
    //     id: 13,
    //     idService: 3,
    //     description: 'Projects Action Plan',
    // },
    14: {
        id: 14,
        idService: 4,
        description: 'Audits Follow Up',
    },
    // 16: { 
    //     id: 16,
    //     idService: 4,
    //     description: 'Audits Action Plan',
    // },
    17: {
        id: 17,
        idService: 1,
        description: 'IP360 & CCM',
    },
    18: {
        id: 18,
        idService: 1,
        description: 'WebInspect'
    },
    19: {
        id: 19,
        idService: 1,
        description: 'Server Hardening'
    },
    21: {
        id: 21,
        idService: 2,
        description: 'Other Request'
    },
    22: {
        id: 22,
        idService: 2,
        description: 'ISSCP-Information Security System Classification Profile',
    },
    23: {
        id: 23,
        idService: 2,
        description: 'TPRM-Third Party Risk Managements',
    },
    24: {
        id: 24,
        idService: 2,
        description: 'VSR-Vendor Security Review',
    },
    26: {
        id: 26,
        idService: 3,
        description: 'Project Action Plan'
    },
    28: {
        id: 28,
        idService: 4,
        description: 'Auditory Action Plan'
    }
}

export const TicketStatusJSON = {
    0: { id: 0, description: 'TICKET.STATUS.INITIAL' },
    1: { id: 1, description: 'TICKET.STATUS.REGISTERED' },
    2: { id: 2, description: 'TICKET.STATUS.REJECTED' },
    3: { id: 3, description: 'TICKET.STATUS.APPROVED' },
    4: { id: 4, description: 'TICKET.STATUS.ASSIGNED' },
    5: { id: 5, description: 'TICKET.STATUS.INPROCESS' },
    6: { id: 6, description: 'TICKET.STATUS.PARTIAL' },
    7: { id: 7, description: 'TICKET.STATUS.ATTENDED' },
    8: { id: 8, description: 'TICKET.STATUS.CLOSED' },
    9: { id: 9, description: 'TICKET.STATUS.OPEINI' },
    10: { id: 10, description: 'TICKET.STATUS.REASSIGN' },
    11: { id: 11, description: 'TICKET.STATUS.CANCELLED_BY_USER' },
    12: { id: 12, description: 'TICKET.STATUS.RETURNED' },
    101: { id: 101, description: 'TICKET.STATUS.INITIALIZED' },
    102: { id: 102, description: 'TICKET.STATUS.DIVIDED' },
    103: { id: 103, description: 'TICKET.STATUS.ADDITIONAL_AUTH_PENDING' },
    104: { id: 104, description: 'TICKET.STATUS.USER_ACTION_PENDING' },
    105: { id: 105, description: 'TICKET.STATUS.CANCELLED' },
    106: { id: 106, description: 'TICKET.STATUS.ASSIGN_PENDING' },
    107: { id: 107, description: 'TICKET.STATUS.ANALYST_ACTION_PENDING' },
    108: { id: 108, description: 'TICKET.STATUS.ESCALATE' },
    404: { id: 404, description: 'TICKET.STATUS.UPDATING' },
    400: { id: 400, description: 'TICKET.STATUS.SYSTEM_CANCELLED' }
}

export const EvaluationType = {
    'staticAnalysis': 'VM.VA.EVALUATION_TYPE.MODAL.STATIC_TITLE',
    'dynamicAnalysis': 'VM.VA.EVALUATION_TYPE.MODAL.DYNAMIC_TITLE',
    'compositionAnalysis': 'VM.VA.EVALUATION_TYPE.MODAL.COMPOSITION_TITLE',
}

export const RegExpresion = {
    EMAIL: {
        caracteres:"^[a-zA-Z0-9_@.+ ]*$",
        caracteresEspeciales:['Space','Backspace','Tab','End','Home','ArrowLeft','ArrowRight','Delete']
    }
}

export const GENERAL =
    [{
        "value": "general",
        "total": 52,
        "detail": [
            {
                "type": "general",
                "description": "sign off request",
                "count": 32
            },
            {
                "type": "general",
                "description": "web scan on demand",
                "count": 20
            }, {
                "type": "general",
                "description": "sign off request",
                "count": 32
            },
            {
                "type": "general",
                "description": "web scan on demand",
                "count": 20
            },
            {
                "type": "general",
                "description": "sign off request",
                "count": 32
            },
            {
                "type": "general",
                "description": "web scan on demand",
                "count": 20
            }
        ]

    },
    {
        "value": "sign-off request",
        "total": 36,
        "detail": [{
            "type": "general",
            "description": "pass",
            "count": 22
        },
        {
            "type": "general",
            "description": "pass conditional",
            "count": 4
        }
        ]
    },
    {
        "value": "web scan on demand",
        "total": 24,
        "detail": [{
            "type": "general",
            "description": "pass",
            "count": 324
        },
        {
            "type": "general",
            "description": "fail",
            "count": 14
        }
        ]

    }
    ]

export const COUNTRY = [{
    "counts": "Chile",
    "details": [
        {
            "type": "general",
            "total": "32",
            "items": [{
                "type": "Vulnerability",
                "description": "32",
                "count": 32,
            },
            {
                "type": "Advisory",
                "description": "11",
                "count": 11
            },
            {
                "type": "Auditory",
                "description": "14",
                "count": 14
            },
            {
                "type": "Projects",
                "description": "14",
                "count": 14
            }
            ]
        },
        {
            "type": "sign",
            "total": "44",
            "items": [{
                "type": "ip360",
                "description": "32",
                "count": 32
            },
            {
                "type": "hardening",
                "description": "18",
                "count": 18
            },
            {
                "type": "auditory",
                "description": "15",
                "count": 15
            },
            ]
        },
        {
            "type": "web scan",
            "total": "44",
            "items": [{
                "type": "ip360",
                "description": "32",
                "count": 32
            },
            {
                "type": "hardening",
                "description": "17",
                "count": 17
            },
            {
                "type": "auditory",
                "description": "12",
                "count": 12
            },
            ]
        }]
}, {
    "counts": "Colombia",
    "details": [
        {
            "type": "general",
            "total": "32",
            "items": [{
                "type": "Vulnerability",
                "description": "32",
                "count": 32,
            },
            {
                "type": "Advisory",
                "description": "11",
                "count": 11
            },
            {
                "type": "Auditory",
                "description": "14",
                "count": 14
            },
            {
                "type": "Projects",
                "description": "14",
                "count": 14
            }
            ]
        },
        {
            "type": "sign",
            "total": "44",
            "items": [{
                "type": "pass",
                "description": "32",
                "count": 322
            },
            {
                "type": "conditional",
                "description": "18",
                "count": 218
            }]
        },
        {
            "type": "web",
            "total": "44",
            "items": [{
                "type": "pass",
                "description": "32",
                "count": 332

            },
            {
                "type": "conditional",
                "description": "17",
                "count": 137
            }]
        }]
}, {
    "counts": "Peru",
    "details": [
        {
            "type": "general",
            "total": "32",
            "items": [{
                "type": "Vulnerability",
                "description": "32",
                "count": 32,
            },
            {
                "type": "Advisory",
                "description": "11",
                "count": 11
            },
            {
                "type": "Auditory",
                "description": "14",
                "count": 14
            },
            {
                "type": "Projects",
                "description": "14",
                "count": 14
            }
            ]
        },
        {
            "type": "sign",
            "total": "44",
            "items": [{
                "type": "pass",
                "description": "32",
                "count": 322
            },
            {
                "type": "conditional",
                "description": "18",
                "count": 218
            }]
        },
        {
            "type": "web",
            "total": "44",
            "items": [{
                "type": "pass",
                "description": "32",
                "count": 332

            },
            {
                "type": "conditional",
                "description": "17",
                "count": 137
            }]
        }]
}, {
    "counts": "Uruguay",
    "details": [
        {
            "type": "general",
            "total": "32",
            "items": [{
                "type": "Vulnerability",
                "description": "32",
                "count": 32,
            },
            {
                "type": "Advisory",
                "description": "11",
                "count": 11
            },
            {
                "type": "Auditory",
                "description": "14",
                "count": 14
            },
            {
                "type": "Projects",
                "description": "14",
                "count": 14
            }
            ]
        },
        {
            "type": "sign",
            "total": "44",
            "items": [{
                "type": "pass",
                "description": "32",
                "count": 322
            },
            {
                "type": "conditional",
                "description": "18",
                "count": 218
            }]
        },
        {
            "type": "web",
            "total": "44",
            "items": [{
                "type": "pass",
                "description": "32",
                "count": 332

            },
            {
                "type": "conditional",
                "description": "17",
                "count": 137
            }]
        }]
}, {
    "counts": "Canada",
    "details": [
        {
            "type": "general",
            "total": "32",
            "items": [{
                "type": "Vulnerability",
                "description": "32",
                "count": 32,
            },
            {
                "type": "Advisory",
                "description": "11",
                "count": 11
            },
            {
                "type": "Auditory",
                "description": "14",
                "count": 14
            },
            {
                "type": "Projects",
                "description": "14",
                "count": 14
            }
            ]
        },
        {
            "type": "sign",
            "total": "44",
            "items": [{
                "type": "pass",
                "description": "32",
                "count": 322
            },
            {
                "type": "conditional",
                "description": "18",
                "count": 218
            }]
        },
        {
            "type": "web",
            "total": "44",
            "items": [{
                "type": "pass",
                "description": "32",
                "count": 332

            },
            {
                "type": "conditional",
                "description": "17",
                "count": 137
            }]
        }]
}, {
    "counts": "Mexico",
    "details": [
        {
            "type": "general",
            "total": "32",
            "items": [{
                "type": "Vulnerability",
                "description": "32",
                "count": 32,
            },
            {
                "type": "Advisory",
                "description": "11",
                "count": 11
            },
            {
                "type": "Auditory",
                "description": "14",
                "count": 14
            },
            {
                "type": "Projects",
                "description": "14",
                "count": 14
            }
            ]
        },
        {
            "type": "sign",
            "total": "44",
            "items": [{
                "type": "pass",
                "description": "32",
                "count": 322
            },
            {
                "type": "conditional",
                "description": "18",
                "count": 218
            }]
        },
        {
            "type": "web",
            "total": "44",
            "items": [{
                "type": "pass",
                "description": "32",
                "count": 332

            },
            {
                "type": "conditional",
                "description": "17",
                "count": 137
            }]
        }]
}]

/*export const COUNTRY = [{	
    "country":"Chile",		
    "services": [
    {
        "value": "general",		      
        "total": "32",
        "detail" : [{			
                "type":"Vulnerability",
                "description": "32",
                "count": 32,                
            },
            {
                "type":"Advisory",
                "description": "11",
                "count": 11                
            },
            {
                "type":"Auditory",
                "description": "14",
                "count": 14                
            },
            {
                "type":"Projects",
                "description": "14",
                "count": 14                
            }
            ]		   
    },
    {
        "value": "sign",        
        "total": "44",
        "detail" : [{			
                "type":"ip360",
                "description": "32",
                "count": 32                
            },
            {
                "type":"hardening",
                "description": "18",
                "count": 18                
            },
            {
                "type":"auditory",
                "description": "15",
                "count": 15                
            },
            ]		   
    },
    {
        "value": "web scan",        
        "total": "44",
        "detail" : [{			
                "type":"ip360",
                "description": "32",
                "count": 32                
            },
            {
                "type":"hardening",
                "description": "17",
                "count": 17                
            },
            {
                "type":"auditory",
                "description": "12",
                "count": 12                
            },
            ]		   
    }]
},{
    "country":"Colombia",		
    "services": [
    {
        "value": "general",		      
        "total": "32",
        "detail" : [{			
                "type":"pass",
                "description": "321",
                "count": 312                
            },
            {
                "type":"fail",
                "description": "11",
                "count": 111                
            }]		   
    },
    {
        "value": "sign",        
        "total": "44",
        "detail" : [{			
                "type":"pass",
                "description": "32",
                "count": 322                
            },
            {
                "type":"conditional",
                "description": "18",
                "count": 218                
            }]		   
    },
    {
        "value": "web",        
        "total": "44",
        "detail" : [{			
                "type":"pass",
                "description": "32",
                "count": 332
                
            },
            {
                "type":"conditional",
                "description": "17",
                "count": 137                
            }]		   
    }]
}]*/

export const TREND = [{
    "value": "Total Request | by Category - Monthly Trend",
    "total": 0,
    "detail": [
        {
            "type": "trend",
            "description": "February",
            "count": 5
        },
        {
            "type": "trend",
            "description": "March",
            "count": 2
        }
    ]
},
{
    "value": "Sign off Request | by Resolution - monthly trend",
    "total": 0,
    "detail": [
        {
            "type": "trend",
            "description": "February",
            "count": 11
        },
        {
            "type": "trend",
            "description": "March",
            "count": 8
        }
    ]
},
{
    "value": "web scan on demand | request by Resolution - monthly trend",
    "total": 0,
    "detail": [
        {
            "type": "trend",
            "description": "February",
            "count": 19
        },
        {
            "type": "trend",
            "description": "March",
            "count": 2
        }
    ]
}
]

export const hoverColor = [
    '#FFCE56',
    '#FF6384',
    '#36A2EB',
    '#83D1BE',
    '#9DD183',
    '#83ACD1',
    '#774DD6',
    '#C74DD6',
    '#D6C74D',
    '#81D64D',
    '#EEB87C',
    '#2C45C3',
    '#2CC35C'
]

export const backColor = [
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)'
]

export const borderColor = [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
]

export const ESTADO_PROYECTO = [
    { value: 'IN PROGRESS' },
    { value: 'DONE' },
    { value: 'NOT STARTED' }
]