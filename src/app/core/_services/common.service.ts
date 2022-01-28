
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
    providedIn: 'root'
})
export class CommonService {
    constructor(private spinner: NgxSpinnerService) { }

    showLoader() {
        this.spinner.show();
    }

    hideLoader() {
        setTimeout(() => {
            this.spinner.hide();
        }, 500);
    }

    public applicationTypes = {
        51: {
            id: 51,
            description: 'paymentSystem',
            value: false,
        }, 
        52: {
            id: 52,
            description: 'cia',
            value: false,
        }, 
        53: {
            id: 53,
            description: 'payment',
            value: false,
        }, 
        54: {
            id: 54,
            description: 'ifa',
            value: false,
        }, 
        55: {
            id: 55,
            description: 'mobile',
            value: false,
        }, 
        56: {
            id: 56,
            description: 'internetBanking',
            value: false,
        }, 
        57: {
            id: 57,
            description: 'others',
            value: false,
        }
    }

    setApplicationTypes(types) {
        let applicationTypes = this.applicationTypes;

        Object.values(applicationTypes).forEach(value => {
            applicationTypes[value.id].value = types[value.description];
        });
        return applicationTypes;
    }
}
