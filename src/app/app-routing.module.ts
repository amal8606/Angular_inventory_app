import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './authentication/login,guard';
import { DashboardComponent } from './modules/dashboard/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

import { ShowPasComponent } from './show-pas/show-pas.component';
import { SimpleProductComponent } from './simple-product/simple-product.component';

const routes: Routes = [
 
  {path:'password',component:ShowPasComponent},
  
  {path:'products/:productId',component:SimpleProductComponent},
  {path:'home',component:HomeComponent},
  {path:'',component:HomeComponent},
  { path: 'dashboard', loadChildren: () => import('./modules/dashboard/dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'login', loadChildren: () => import('./modules/login/login/login.module').then(m => m.LoginModule),canActivate:[LoginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
