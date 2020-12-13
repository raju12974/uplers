import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { AuthService } from '../auth.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


  constructor(private auth: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (req.url.indexOf('login') !== -1) {
        // console.log("coming here");
      return next.handle(req);
    }
    // Get the auth token from the service.
    const authToken = this.auth.getAuthorizationToken();
    // console.log("going next");
    /*
    * The verbose way:
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      headers: req.headers.set('Authorization', authToken)
    });
    */
    // Clone the request and set the new header in one step.
    const authReq = req.clone({ setHeaders: { Authorization: 'Bearer '+authToken } });

    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
      catchError( err => {
        if (err.status === 401) {
          localStorage.clear();
          this.router.navigate(['/login']);
          return;
        }
        if(err.status === 403){
          localStorage.setItem('admin', 'N');
          this.router.navigate(['']);
          return ;
        }
        console.log(err);
        return throwError(err);
      })
    )
  }
}
