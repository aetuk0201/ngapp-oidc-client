import { Constants } from './../../core/constants';
import { AuthService } from 'src/app/core/auth.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from "@angular/common/http";
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor  {

  constructor(private _authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    //ensure that only calls going to the desired api are intercepted
    if (req.url.startsWith(Constants.apiRoot)) {
        return from(this._authService.getAccessToken().then(token => {
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
          const authReq = req.clone({ headers });
          
          return next.handle(authReq).toPromise();
        }));
    } else {
      return next.handle(req);
    }

    
  }
}
