import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
}

)
    

export class authApiService{
    constructor(private readonly http:HttpClient){

    }
    public url='https://api-sales-app.josetovar.dev/auth'



public getAuth(): Observable<any> {
    return this.http.post(`${this.url}`, {});
  }
 
}