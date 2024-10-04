import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

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

}]
