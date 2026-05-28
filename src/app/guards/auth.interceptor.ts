import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // pega token do localStorage
    const token = localStorage.getItem('authToken');

    // clona a requisição adicionando o Authorization
    const authReq = token
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
      : req;

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        // se 401, redireciona pro login
        if (err.status === 401) {
          localStorage.removeItem('authToken');
          this.router.navigate(['/login']);
        }
        return throwError(() => err);
      })
    );
  }
}