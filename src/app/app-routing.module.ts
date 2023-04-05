import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './authentication/login,guard';
import { HomeComponent } from './home/home.component';

import { ShowPasComponent } from './show-pas/show-pas.component';
import { SimpleProductComponent } from './simple-product/simple-product.component';
import { ViewsalesComponent } from './viewsales/viewsales.component';

const routes: Routes = [
  {path:'password',component:ShowPasComponent},
  {path:'sales/:sale_id',component:ViewsalesComponent},
  {path:'products/:productId',component:SimpleProductComponent},
  {path:'home',component:HomeComponent},
  {path:'',component:HomeComponent},
  
  { path: 'login', loadChildren: () => import('./modules/login/login/login.module').then(m => m.LoginModule)},
  { path: 'dashboard', loadChildren: () => import('./modules/Dashboard_/dashboard_.module').then(m => m.Dashboard_Module),canActivate:[LoginGuard] },
  {path:'register',component:ShowPasComponent},
  { path: 'sales', loadChildren: () => import('./modules/sales/sales.module').then(m => m.SalesModule) },
 
  { path: 'overview', loadChildren: () => import('./modules/overview/overview.module').then(m => m.OverviewModule) },
 { path: 'all-sales', loadChildren: () => import('./modules/sales/all-sales/all-sales.module').then(m => m.AllSalesModule) },
 { path: 'single-sale', loadChildren: () => import('./modules/sales/single-sale/single-sale.module').then(m => m.SingleSaleModule) }
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
