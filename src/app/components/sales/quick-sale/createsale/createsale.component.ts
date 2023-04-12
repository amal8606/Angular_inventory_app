import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable ,map} from 'rxjs';
import { apiService } from 'src/app/http services/api.service';
import { GenerateDataService } from 'src/app/services/generate-data.service';
import { notificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-createsale',
  templateUrl: './createsale.component.html',
})
export class CreatesaleComponent implements OnInit{
constructor(private readonly toastr:notificationService,
  private readonly dataServ:GenerateDataService,
  private readonly api:apiService,
  private readonly notification:notificationService,
  private readonly route:Router){

}
quickSaleProducts:any=[]
products$!:Observable<any>
addSale=false;
showDiv=false;
searchValue!:string;
public quicksaleForm: FormGroup = new FormGroup({
  name: new FormControl('', Validators.required),
  products: new FormArray([], Validators.required),
});
get quicksaleProducts(): FormArray {
  return this.quicksaleForm.controls['products'] as FormArray;
}
public addProductTolist(product:any) {

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
deleteProduct(index:number){
  this.quickSaleProducts.splice(index,1);
  this.quicksaleProducts.removeAt(index)
  
}
clear(){
  this.quicksaleForm.reset()
  this.quickSaleProducts=[];
}
searchName() {
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

sendNewSales(){
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
closeModal(){
  this.addSale=false;
  this.quickSaleProducts=[]
  this.quicksaleForm.reset()
}
ngOnInit(): void {
  this.products$ = this.dataServ.getProducts();
    this.products$.subscribe();
}
}
