import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { GenerateDataService } from '../services/generate-data.service';
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
    private readonly functionServ:GetFunctionService,
    private readonly dataServ:GenerateDataService){}
addSale=false;
info=false;
showDiv=false;
clients$!: Observable<any>;
products$!: Observable<any>;
Showtable=false;

searchValue!:string;
productValue!:string;
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
 this.clients$= this.dataServ.getClients();
 this.clients$.subscribe()
 this.products$=this.dataServ.getProducts()
 this.products$.subscribe()
}
searchName(){
this.showDiv=true
this.clients$=this.clients$.pipe(map(client=>{
  return client.filter((client:any)=>client.first_name.toLowerCase().includes(this.searchValue.toLowerCase()))}))
}

selectClient(clientId:any,value:string){
  this.showDiv=false
  console.log(clientId)
  this.saleForm.get('client_id')?.setValue(clientId)
  console.log(this.saleForm.value)
  this.searchValue=value
 

}
sendNewSales(){

  this.http.post(`${this.url}/sales`,this.saleForm.value).subscribe({
    next:(response)=>{
      this.toastr.showSuccess("New sale added successFully")
      console.log(response)
      this.saleForm.reset()
      this.addSale=false
      this.searchValue=''
this.Showtable=false

      this.functionServ.sendClickEvent()
    },
    error:(error)=>{
      this.toastr.showError(error)
    }
    
  })
  console.log(this.saleForm.value)
}
setProductId(){

}
closeSales(){
  this.addSale=false;
  this.showDiv=false
  this.searchValue='';
  this.saleForm.reset();
  this.saleProducts.clear()
this.Showtable=false

}
showtable(){
  this.Showtable=true;
  this,this.products$=this.products$.pipe(map(product=>{
    return product.filter((product:any)=>product.active==true)}))
  }

}

