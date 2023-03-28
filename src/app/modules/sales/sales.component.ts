import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { apiService } from 'src/app/http services/api.service';
import { map } from 'rxjs';
import { GetFunctionService } from 'src/app/services/get-function.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent {
  constructor(public apiService:apiService,
    public readonly http:HttpClient,
    public readonly functionServ:GetFunctionService){

  }
  public clients$!:Observable<any>;
  public products$!:Observable<any>;
  public sales$!:Observable<any>;
  searchValue!:string;
  filteredClients=[]
url="https://api-sales-app.josetovar.dev"
  ngOnInit(): void {
  
    this.getSales()
  }
  public clickEventSubscription=this.functionServ.getClickEvent().subscribe(()=>{
    this.getSales()
  })
  private getSales() {
    this.sales$ = this.http.get<{
      
        id: number,
        "total": number,
        "created_at": "2023-03-27T04:24:48.849Z",
        client: {
          id: number,
          first_name: string,
          last_name: string,
          address: string,
          city: string,
          state: string,
        country: string,
          phone: string,
          email: string
        },
        items: [
          {
            id: number,
            created_at: string,
            sale_id: number,
            price: number,
            quantity: number,
            product_id: number
          }
        ]
      
    }>(`${this.url}/sales`);
    this.sales$.subscribe((client) => {
      console.log(client)

    });
  }
  
  // getClientId(){
  //   console.log(this.searchValue)
  //   this.filteredClients=this.clients$.pipe(
  //     map((clients: any) => {
  //    clients.filter((client:any)=>client.first_name.toLowerCase().includes(this.searchValue.toLocaleLowerCase()))
  //       console.log(clients)
  //     })
  //   );

  // }

}
