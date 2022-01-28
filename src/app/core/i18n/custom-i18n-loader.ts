import { HttpClient } from "@angular/common/http";
import { TranslateLoader } from "@ngx-translate/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export class CustomI18nLoader implements TranslateLoader {
    constructor(private http: HttpClient) {
  
    }
    getTranslation(langCountry: string): Observable<any> {
      return this.http.get(`${environment.API_URL}/i18n/${langCountry}`);
    }
  }