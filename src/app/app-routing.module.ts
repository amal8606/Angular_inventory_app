import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './-Core/authentication/Guards/login,guard';
import { HomeComponent } from './-Modules/home/home.component';

import { ShowPasComponent } from './-Modules/Auth/Register/show-pas.component';
import { SimpleProductComponent } from 'src/app/-Modules/Dashboard_/products/pages/simple-product/simple-product.component';
import { ViewsalesComponent } from 'src/app/-Modules/Dashboard_/sales/pages/viewsales/viewsales.component';

const routes: Routes = [
  {path:'password',component:ShowPasComponent},
  {path:'sales/:sale_id',component:ViewsalesComponent},
  {path:'products/:productId',component:SimpleProductComponent},
  {path:'home',component:HomeComponent},
  {path:'',component:HomeComponent},
  
  { path: 'login', loadChildren: () => import('./-Modules/Auth/login/login.module').then(m => m.LoginModule)},
  { path: 'dashboard', loadChildren: () => import('./-Modules/Dashboard_/dashboard.module').then(m => m.Dashboard_Module),canActivate:[LoginGuard] },
  {path:'register',component:ShowPasComponent},
 

 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
