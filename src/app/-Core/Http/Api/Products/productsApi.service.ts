import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
}

)
    

export class productApiService{
    constructor(private readonly http:HttpClient){

    }
    public url='https://api-sales-app.josetovar.dev/products'
getApi():Observable<any>{
   return this.http.get(`${this.url}`)
}

getSingleProduct(productId:any):Observable<any>{
    return this.http.get(`${this.url}/${productId}`)

}

updateSingleProduct(product:any,productId:number):Observable<any>{
    return this.http.put(`${this.url}`,product)
}
addProduct(product:any):Observable<any>{
    return this.http.post(`${this.url}`,product)
}
public getAuth(): Observable<any> {
    return this.http.post(`${this.url}/auth`, {});
  }
  deleteProduct(productId:number){
    return this.http.delete(`${this.url}/${productId}`)
}
importProduct(file:File):Observable<any>{
    console.log(file)
    const formData= new FormData();
    formData.append('csv',file,file.name)
    console.log(formData)
return this.http.post(`${this.url}/import`,formData)
}
}