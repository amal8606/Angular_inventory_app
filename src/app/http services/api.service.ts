import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
}

)
    

export class apiService{
    constructor(private readonly http:HttpClient){

    }
    public url='https://api-sales-app.josetovar.dev'
getApi(endpoint:any):Observable<any>{
   return this.http.get(`${this.url}/${endpoint}`)
}

getSingleProduct(productId:any,endpoint:any):Observable<any>{
    return this.http.get(`${this.url}/${endpoint}/${productId}`)

}

updateSingleProduct(product:any):Observable<any>{
    return this.http.put(`${this.url}/products`,product)
}
addProduct(product:any):Observable<any>{
    return this.http.post(`${this.url}/products`,product)
}
public getAuth(): Observable<any> {
    return this.http.post(`${this.url}/auth`, {});
  }

}