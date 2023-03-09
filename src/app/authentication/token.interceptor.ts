import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from 'rxjs'

@Injectable({
    providedIn:'root'
})

export class TokenInterceptor implements HttpInterceptor {
  constructor() {
    console.log('hi')
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const access_token= JSON.parse(
        localStorage.getItem('access_token') || '{}'
    );

    // console.log( access_token)
    // if (!req.url.includes('login')){
    //     const authReq=req.clone({
    //         setHeaders:{
    //             Autherization:`Bearer ${access_token}`,
    //         },
    //     });


    if (!req.url.includes('login')) {
      const authReq = req.clone({
        setHeaders: {
          Authorization:`Bearer ${access_token}`,
        },
      });


        return next.handle(authReq).pipe(catchError(this.handleErrors))
    }else{
        return next.handle(req)
    }
   
    
  };
  handleErrors(error:HttpErrorResponse){
    switch(error.status){
        case 401:
return throwError(()=>new Error('not authorized'));
default:
    return throwError(()=> new Error('Error!....'))
    }
    
}
}
