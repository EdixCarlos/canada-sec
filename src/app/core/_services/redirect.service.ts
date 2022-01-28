import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
    providedIn: 'root'
})
export class RedirectService {

    constructor(
        private router: Router,
        private location: Location,
        private spinner: NgxSpinnerService) { }

    redirectTo(uri: string, relative: boolean = false, route?: ActivatedRoute, delay: number = 0, reload = false) {
        this.spinner.show();
        if (relative) {
            setTimeout(() => {
                if (reload) {
                    this.router.navigate(['/'], { skipLocationChange: true }).then(
                        () => {
                            console.log('navigate then')
                            console.log(uri)
                            console.log(route)
                            let path = route.snapshot['_routerState'].url;
                            console.log(path)
                            this.router.navigate([path]);
                        }
                    );
                } else {
                    this.router.navigate([uri], { relativeTo: route });
                }
                this.spinner.hide();
            }, delay);
        } else {
            setTimeout(() => {
                if (reload) {
                    this.router.navigate(['/'], { skipLocationChange: true }).then(
                        () => {
                            this.router.navigate([uri]);
                        }
                    );
                } else {
                    this.router.navigate([uri]);
                }
                this.spinner.hide();
            }, delay);
        }

        // if (reload)
        //     window.location.reload();

    }
}
