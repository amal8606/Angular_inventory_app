import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashBoardGuard } from 'src/app/authentication/dashboard.quard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [{ path: '', component: DashboardComponent ,canActivate:[dashBoardGuard]}];

@NgModule({
  imports: [RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
