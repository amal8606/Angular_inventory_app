import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './authentication/login,guard';
import { HomeComponent } from './home/home.component';

import { ShowPasComponent } from './show-pas/show-pas.component';
import { SimpleProductComponent } from './simple-product/simple-product.component';

const routes: Routes = [
 
  {path:'password',component:ShowPasComponent},
  
  {path:'products/:productId',component:SimpleProductComponent},
  {path:'home',component:HomeComponent},
  {path:'',component:HomeComponent},
  
  { path: 'login', loadChildren: () => import('./modules/login/login/login.module').then(m => m.LoginModule),canActivate:[LoginGuard] },
  { path: 'dashboard', loadChildren: () => import('./modules/Dashboard_/dashboard_.module').then(m => m.Dashboard_Module) },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
