import { UserService } from './../services/user.service';
import { ToastComponent } from './../../shared/components/toast/toast.component';
import { Router } from '@angular/router';
import { TokenService } from './../services/token.service';

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType, HttpErrorResponse } from '@angular/common/http/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpEventType.Response>> {
    let authRequest: any;
    authRequest = req.clone({
      setHeaders: {
        API_KEY: environment.apiKey
      }
    });
    return next.handle(authRequest);

  }


}
