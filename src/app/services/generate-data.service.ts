import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class GenerateDataService {

    
  constructor(private readonly http:HttpClient) {
   }
clients$!: Observable<any>;
url = 'https://api-sales-app.josetovar.dev';

 getClients():Observable<any> {
    return this.http.get<{
      id: Number;
      first_name: string;
      last_name: string;
      address: string;
      city: string;
      state: string;
      country: string;
      phone: string;
      email: string;
    }>(`${this.url}/clients`);

  }
  getProducts():Observable<any>{
    return this.http.get<{
      id: number;
      name: string;
      price: number;
      sku: string;
      stock: number;
    }>(`${this.url}/products`);

  }
}
