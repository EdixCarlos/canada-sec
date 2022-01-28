import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class NoCacheHeadersInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!environment.isMockEnabled) {
      let clonedRequest = req.clone({
        withCredentials: true,
        setParams: {
          time: String(new Date().getTime()) // IE11 cache
        }
      });
      // Doc: https://support.microsoft.com/en-us/help/234067/how-to-prevent-caching-in-internet-explorer
      clonedRequest.headers.append('Access-Control-Allow-Origin', '*');
      clonedRequest.headers.append('Access-Control-Allow-Credentials', 'true');
      clonedRequest.headers.append('Cache-Control', 'no-cache');
      clonedRequest.headers.append('Pragma', 'no-cache');
      clonedRequest.headers.append('Expires', '-1');
      //
      return next.handle(clonedRequest);
    } else {
      return next.handle(req);
    }
  }
}