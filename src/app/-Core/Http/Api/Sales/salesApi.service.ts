import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
}

)
    

export class salesApiService{
    constructor(private readonly http:HttpClient){

    }
    public url='https://api-sales-app.josetovar.dev/sales'

getApi():Observable<any>{
   return this.http.get(`${this.url}`)
}

getSingleSales(saleId:any):Observable<any>{
    return this.http.get(`${this.url}/${saleId}`)

}

addSales(sale:any):Observable<any>{
    return this.http.post(`${this.url}`,sale)
}

}