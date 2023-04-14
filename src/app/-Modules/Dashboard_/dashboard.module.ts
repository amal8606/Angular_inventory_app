import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientsComponent } from 'src/app/-Modules/Dashboard_/clients/clients.component';
import { OverviewComponent } from 'src/app/-Modules/Dashboard_/overview/overview.component';
import { ProductsComponent } from 'src/app/-Modules/Dashboard_/products/products.component';
import { AllSalesComponent } from '@sales/pages/all-sales/all-sales.component';
import { CreateSalesComponent } from '@sales/pages/create-sales/create-sales.component';
import { CreatesaleComponent } from '@sales/pages/quickSale/createsale/createsale.component';
import { QuickSaleComponent } from '@sales/pages/quickSale/quick-sale.component';
import { SalesComponent } from 'src/app/-Modules/Dashboard_/sales/sales.component';
import { SingleSaleComponent } from '@sales/pages/single-sale/single-sale.component';
import { NewClientComponent } from 'src/app/-Modules/Dashboard_/clients/pages/new-client/new-client.component';
import { Dashboard_RoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from 'src/app/-Shared/shared.module';

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
