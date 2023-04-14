import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/-Core/authentication/Guards/login,guard';
import { ClientsComponent } from 'src/app/-Modules/Dashboard_/clients/clients.component';
import { DashboardComponent } from './dashboard.component';
import { ProductsComponent } from 'src/app/-Modules/Dashboard_/products/products.component';
import { SalesComponent } from '@sales/sales.component';
import { AllSalesComponent } from '@sales/pages/all-sales/all-sales.component';
import { SingleSaleComponent } from '@sales/pages/single-sale/single-sale.component';
import { QuickSaleComponent } from '@sales/pages/quickSale/quick-sale.component';
import { OverviewComponent } from 'src/app/-Modules/Dashboard_/overview/overview.component';


const routes: Routes = [{ path: '', component: DashboardComponent ,canActivateChild:[LoginGuard],
children:[{ path: 'products', component:ProductsComponent},
{ path: '', component:OverviewComponent },
{ path: 'overview',component:OverviewComponent },

{ path: 'clients',component:ClientsComponent},
{path:'sales',component:SalesComponent,children:[{ path: 'all-sales', component:AllSalesComponent},
{ path: 'quicksales', component:QuickSaleComponent,children:[{path:':id',component:SingleSaleComponent}]},
{path:'',component:AllSalesComponent}]}


]

}];

@NgModule({
  imports: [RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class Dashboard_RoutingModule { }
