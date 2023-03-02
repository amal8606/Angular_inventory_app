import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashBoardGuard } from './authentication/dashboard.quard';
import { LoginGuard } from './authentication/login,guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ShowPasComponent } from './show-pas/show-pas.component';
import { SimpleProductComponent } from './simple-product/simple-product.component';

const routes: Routes = [
  {path:'login',component:LoginComponent,canActivate:[LoginGuard]},
  {path:'dashboard',component:DashboardComponent,canActivate:[dashBoardGuard]},
  {path:'password',component:ShowPasComponent},
  {path:'products/:productId',component:SimpleProductComponent},
  {path:'home',component:HomeComponent},
  {path:'',component:HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
