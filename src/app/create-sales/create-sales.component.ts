import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { GetFunctionService } from '../services/get-function.service';
import { notificationService } from '../services/notification.service';
@Component({
  selector: 'app-create-sales',
  templateUrl: './create-sales.component.html',
  styleUrls: ['./create-sales.component.scss']
})
export class CreateSalesComponent implements OnInit{
  constructor(private readonly http:HttpClient,
    private readonly toastr:notificationService,
    private readonly functionServ:GetFunctionService){}
addSale=false;
info=false;
clients$!: Observable<any>;
searchValue!:string;
url = 'https://api-sales-app.josetovar.dev';

public saleForm:FormGroup=new FormGroup({
  client_id: new FormControl(null,Validators.required),
  products: new FormArray([],Validators.required)
})
get saleProducts():FormArray{
return this.saleForm.controls['products'] as FormArray;
}
public addProductTolist(){
  const newProduct:FormGroup=new FormGroup({
    id:new FormControl(null,Validators.required),
    quantity:new FormControl(null,Validators.required)
  })
  this.saleProducts.push(newProduct);

}
public removeProduct(productIndex:any){
  this.saleProducts.removeAt(productIndex)
}
ngOnInit(): void {
  this.getClients();
}
private getClients() {
  this.clients$ = this.http.get<{
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
  this.clients$.subscribe((client) => {
    console.log(client)

  });
}
searchName(){

this.clients$=this.clients$.pipe(map(client=>{
  return client.filter((client:any)=>client.first_name.toLowerCase().includes(this.searchValue.toLowerCase()))}))
}

selectClient(clientId:any,value:string){
  console.log(clientId)
  this.saleForm.get('client_id')?.setValue(clientId)
  console.log(this.saleForm.value)
  this.searchValue=value

  this.info=true
}
sendNewSales(){

  this.http.post(`${this.url}/sales`,this.saleForm.value).subscribe({
    next:(response)=>{
      this.toastr.showSuccess("New sale added successFully")
      console.log(response)
      this.saleForm.reset()
      this.addSale=false
      this.functionServ.sendClickEvent()
    },
    error:(error)=>{
      this.toastr.showError(error)
    }
    
  })
  console.log(this.saleForm.value)
}
}


