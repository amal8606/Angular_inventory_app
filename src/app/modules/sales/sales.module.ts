import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { SalesComponent } from './sales.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateSalesComponent } from 'src/app/create-sales/create-sales.component';
import { SharedModule } from '../shareModule.module';


@NgModule({
  declarations: [
    SalesComponent,
  CreateSalesComponent,
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  SharedModule

  ]
})
export class SalesModule { }
