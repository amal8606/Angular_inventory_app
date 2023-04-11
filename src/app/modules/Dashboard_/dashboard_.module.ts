import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Dashboard_RoutingModule } from './dashboard_-routing.module';
import { Dashboard_Component } from './dashboard_.component';
import { ClientsComponent } from 'src/app/components/clients/clients.component';
import { NewClientComponent } from 'src/app/new-client/new-client.component';
import { SharedModule } from '../shareModule.module';
import { DashboardComponent } from 'src/app/components/products/dashboard.component';
import { SalesComponent } from 'src/app/components/sales/sales.component';
import { AllSalesComponent } from 'src/app/components/sales/all-sales/all-sales.component';
import { QuickSaleComponent } from 'src/app/components/sales/quick-sale/quick-sale.component';
import { SingleSaleComponent } from 'src/app/components/sales/single-sale/single-sale.component';
import { CreatesaleComponent } from 'src/app/components/sales/quick-sale/createsale/createsale.component';
import { CreateSalesComponent } from 'src/app/components/sales/create-sales/create-sales.component';
import { OverviewComponent } from 'src/app/components/overview/overview.component';

@NgModule({
  declarations: [
    Dashboard_Component,
    ClientsComponent,
    NewClientComponent,
    DashboardComponent,
    SalesComponent,
    AllSalesComponent,
    QuickSaleComponent,SingleSaleComponent,
    CreatesaleComponent,
    SingleSaleComponent,
    CreateSalesComponent,
    OverviewComponent
    
   
    
  ],
  imports: [
    CommonModule,
    Dashboard_RoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
 
   
  
    
  ]
})
export class Dashboard_Module {

 }
