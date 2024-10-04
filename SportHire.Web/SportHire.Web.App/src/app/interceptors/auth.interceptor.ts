import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = localStorage.getItem('token');

    if (token) {
      const cloneReq = req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) });
      return next.handle(cloneReq);
    }
    else {
      return next.handle(req);
    }
  }
}

export const AuthInterceptorProvider = [{
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}]
