import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationComponent } from 'src/app/pagination/pagination.component';
import { paginationPipe } from 'src/app/pipes/pagination.pipe';



@NgModule({
  declarations: [
    DashboardComponent,
    PaginationComponent,
    paginationPipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    
  ]
})
export class DashboardModule {

 }
