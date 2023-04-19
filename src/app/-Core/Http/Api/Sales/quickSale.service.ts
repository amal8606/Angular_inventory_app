import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
}

)
    

export class quickSalesApiService{
    constructor(private readonly http:HttpClient){

    }
    public url='https://api-sales-app.josetovar.dev/quick-sales'

getApi():Observable<any>{
   return this.http.get(`${this.url}`)
}

getSinglequickSales(saleId:any):Observable<any>{
    return this.http.get(`${this.url}/${saleId}`)

}
  public addQuickSale(data:any){
   return this.http.post(`${this.url}`,data);
  }
  public updateQsales(data:any){
    return this.http.put(`${this.url}`,data)
  }
  public deleteQsale(id:number){
    return this.http.delete(`${this.url}/${id}`)
}
}
