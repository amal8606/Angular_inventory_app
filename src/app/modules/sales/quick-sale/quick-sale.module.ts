import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuickSaleComponent } from './quick-sale.component';
import { quickSaleRoutingModule } from './quick-sale-routing.module';
import { CreatesaleComponent } from './createsale/createsale.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shareModule.module';



@NgModule({
  declarations: [
QuickSaleComponent,
CreatesaleComponent


  ],
  imports: [
    CommonModule,
    quickSaleRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
 
  ]
})
export class quickSaleModule { }
