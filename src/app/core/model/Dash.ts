export class Dash{
    header: string[];
    value: string[];
    leyend: string;
    it: number[];
}

export class Extend{    
    type: string;  
    count: number;  
    description: string;      
}
/** */

export class General{
    type: string;
    total: number;
    data: string[];

}
/** */

export class Country{
    value: string;    
    services: CountryDetail[];    
}

export class CountryDetail{
    value: string; 
    total: number;   
    detail: CountryItem[];    
}

export class CountryItem{
    type: string; 
    count: number;   
    description: string; 
}

/** */
export class Trend{
    type: string;
    description: string;
    trend: string[];
}
