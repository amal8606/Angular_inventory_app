import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AllSalesRoutingModule } from './all-sales-routing.module';
import { AllSalesComponent } from './all-sales.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shareModule.module';


@NgModule({
  declarations: [
    AllSalesComponent
  ],
  imports: [
    CommonModule,
    AllSalesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class AllSalesModule { }
