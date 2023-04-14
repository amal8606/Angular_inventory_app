import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Iclient } from 'src/app/-Shared/interfaces/client.interface';
import { Iproducts } from 'src/app/-Shared/interfaces/product.interface';
@Injectable({
  providedIn: 'root'
})
export class GenerateDataService {

    
  constructor(private readonly http:HttpClient) {
   }
clients$!: Observable<any>;
url = 'https://api-sales-app.josetovar.dev';

 getClients():Observable<any> {
    return this.http.get<Iclient>(`${this.url}/clients`);

  }
  getProducts():Observable<any>{
    return this.http.get<Iproducts>(`${this.url}/products`);

  }
}
