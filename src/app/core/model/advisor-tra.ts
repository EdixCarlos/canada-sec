import { FormControl, FormGroup, Validators } from '@angular/forms';

export class CheckList{
    id: number;
    domain: string;
    securityControl: string;
    nistDomain: string;
    optioner: string;
    placeholder: string;
    additionalInformation: string;

    static asFormGroup(cl: CheckList): FormGroup {
        const fg = new FormGroup({
          id: new FormControl(cl.id),
          domain: new FormControl(cl.domain),
          securityControl: new FormControl(cl.securityControl),
          nistDomain: new FormControl(cl.nistDomain,),
          optioner: new FormControl(null, Validators.required),
          placeholder: new FormControl(cl.additionalInformation),
          comments: new FormControl(null, Validators.required )
        });
        return fg;
    }
    
}

export class TicketSecurity {
  idTicket: number;
  idSecurityCheckList: number;
  value: string;
  additionalInformation: string;
}

export class DATAREPORT{
  id: number;
  idTicket: number;
  idSecurityTeam: number;
  securityTeam: string;
  domain: string;
  securityControl: string;
  nistDomain: string;
  additionalInformation: string;
  value: string;
}

export interface REPORT{ 
    securityTeam: string;
    domain: string;
    securityControl: string;
    nistDomain: string;
    idTicket: number;
    value: string;
    additionalTicket: string;
}