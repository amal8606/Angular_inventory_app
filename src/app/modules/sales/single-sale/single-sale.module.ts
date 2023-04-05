import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleSaleRoutingModule } from './single-sale-routing.module';
import { SingleSaleComponent } from './single-sale.component';


@NgModule({
  declarations: [
    SingleSaleComponent
  ],
  imports: [
    CommonModule,
    SingleSaleRoutingModule
  ]
})
export class SingleSaleModule { }
