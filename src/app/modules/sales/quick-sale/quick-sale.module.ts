import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuickSaleComponent } from './quick-sale.component';
import { quickSaleRoutingModule } from './quick-sale-routing.module';



@NgModule({
  declarations: [
QuickSaleComponent


  ],
  imports: [
    CommonModule,
    quickSaleRoutingModule,
 
  ]
})
export class quickSaleModule { }
