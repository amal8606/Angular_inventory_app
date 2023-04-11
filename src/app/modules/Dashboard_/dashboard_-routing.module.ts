import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/authentication/login,guard';
import { ClientsComponent } from 'src/app/components/clients/clients.component';
import { Dashboard_Component } from './dashboard_.component';
import { DashboardComponent } from 'src/app/components/products/dashboard.component';
import { SalesComponent } from 'src/app/components/sales/sales.component';
import { AllSalesComponent } from 'src/app/components/sales/all-sales/all-sales.component';
import { SingleSaleComponent } from 'src/app/components/sales/single-sale/single-sale.component';
import { QuickSaleComponent } from 'src/app/components/sales/quick-sale/quick-sale.component';
import { OverviewComponent } from 'src/app/components/overview/overview.component';


const routes: Routes = [{ path: '', component: Dashboard_Component ,canActivateChild:[LoginGuard],
children:[{ path: 'products', component:DashboardComponent},
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
