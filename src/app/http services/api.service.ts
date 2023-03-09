import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
}

)
    

export class apiService{
    constructor(private readonly http:HttpClient){

    }
    public url='https://api-sales-app.josetovar.dev'
getApi(endpoint:any){
   return this.http.get(`${this.url}/${endpoint}`)
}

getSingleProduct(productId:any):any{
    return this.http.get(`${this.url}/products/${productId}`)

}
updateSingleProduct(product:any){
    return this.http.put(`${this.url}/products`,product)
}
addProduct(product:any){
    return this.http.post(`${this.url}/products`,product)
}

}