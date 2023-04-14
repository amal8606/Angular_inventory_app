import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn:'root'
}

)
    

export class clientApiService{
    constructor(private readonly http:HttpClient){

    }
    public url='https://api-sales-app.josetovar.dev/clients'
getApi():Observable<any>{
   return this.http.get(`${this.url}`)
}

addClient(client:any):Observable<any>{
    return this.http.post(`${this.url}`,client)
}
updateClient(client:any):Observable<any>{
    return this.http.put(`${this.url}`,client)
}
deleteClient(clientId:number){
    return this.http.delete(`${this.url}/${clientId}`)
}
}