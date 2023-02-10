import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const url = request.url.split('/');
        const isPublicRouterRequest = url.indexOf('auth') !== -1;
       
        if(!isPublicRouterRequest){
            const token = localStorage.getItem('access-token');

            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'json'
             });
        }

        return next.handle(request).pipe(
           catchError((error) => {
               if(error instanceof HttpErrorResponse) {
                   if(error.status === 401 || error.status === 403) {
                       localStorage.removeItem('access-token');
                   }
               }
               throw new HttpErrorResponse(error);
           })
        );
    }
}