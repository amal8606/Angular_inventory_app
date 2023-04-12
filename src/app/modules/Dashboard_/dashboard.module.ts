import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Dashboard_RoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ClientsComponent } from 'src/app/components/clients/clients.component';
import { NewClientComponent } from 'src/app/new-client/new-client.component';
import { SharedModule } from '../shareModule.module';
import { ProductsComponent } from 'src/app/components/products/products.component';
import { SalesComponent } from '@sales/sales.component';
import { AllSalesComponent } from '@sales/all-sales/all-sales.component';
import { QuickSaleComponent } from '@sales/quick-sale/quick-sale.component';
import { SingleSaleComponent } from '@sales/single-sale/single-sale.component';
import { CreatesaleComponent } from '@sales/quick-sale/createsale/createsale.component';
import { CreateSalesComponent } from '@sales/create-sales/create-sales.component';
import { OverviewComponent } from 'src/app/components/overview/overview.component';

@NgModule({
  declarations: [
    ProductsComponent,
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
