import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { quickSalesApiService } from 'src/app/-Core/Http/Api/Sales/quickSale.service';
import { GenerateDataService } from 'src/app/-Core/authentication/services/generate-data.service';
import { notificationService } from 'src/app/-Core/authentication/services/notification.service';
import { Iproducts } from 'src/app/-Shared/interfaces/product.interface';

@Component({
  selector: 'app-createsale',
  templateUrl: './createsale.component.html',
})
export class CreatesaleComponent implements OnInit{
constructor(private readonly toastr:notificationService,
  private readonly dataServ:GenerateDataService,
  private readonly api:quickSalesApiService,
  private readonly notification:notificationService,
  private readonly route:Router){

}
public quickSaleProducts:any=[]
public products$!:Observable<any>
public addSale=false;
public showDiv=false;
public searchValue!:string;
public quicksaleForm: FormGroup = new FormGroup({
  name: new FormControl('', Validators.required),
  products: new FormArray([], Validators.required),
});
get quicksaleProducts(): FormArray {
  return this.quicksaleForm.controls['products'] as FormArray;
}
public addProductTolist(product:Iproducts) {

  const productExist=this.quicksaleProducts.controls.some((control)=>
  control.value==product.id)
if(!productExist){


  const newProductControl = new FormControl(product.id);

    this.quicksaleProducts.push(newProductControl);
    this.showDiv=false;
    this.quickSaleProducts.push(product)


   
  }else{
    this.notification.showWarining("product already added")
  }
  


}
public deleteProduct(index:number){
  this.quickSaleProducts.splice(index,1);
  this.quicksaleProducts.removeAt(index)
  
}
public clear(){
  this.quicksaleForm.reset()
  this.quickSaleProducts=[];
}
public searchName() {
  this.showDiv = true;
  this.products$ = this.products$.pipe(
    map((products:any) => {
      return products.filter((product: any) =>
      product.name
          .toLowerCase()
          .includes(this.searchValue.toLowerCase()),
      );
    })

  );
}

public sendNewSales(){
  const value=this.quicksaleForm.value;
 
  this.api.addQuickSale(value).subscribe({
    next:()=>{
      this.notification.showSuccess('New quick sale added successfully')
      this.addSale=false;
    },
    error:()=>{
      this.notification.showError('error')
    }
  })
}
public closeModal(){
  this.addSale=false;
  this.quickSaleProducts=[]
  this.quicksaleForm.reset()
}
ngOnInit(): void {
  this.products$ = this.dataServ.getProducts();
    this.products$.subscribe();
}
}
