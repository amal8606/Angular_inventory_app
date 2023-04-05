import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { dashBoardGuard } from 'src/app/authentication/dashboard.quard';
import { Dashboard_Component } from './dashboard_.component';
import { LoginGuard } from 'src/app/authentication/login,guard';

const routes: Routes = [{ path: '', component: Dashboard_Component ,canActivateChild:[LoginGuard],
children:[{ path: 'products', loadChildren: () => import('../../modules/dashboard/dashboard/dashboard.module').then(m => m.DashboardModule) },
{ path: '', loadChildren: () => import('../../modules/overview/overview.module').then(m => m.OverviewModule) },
{ path: 'clients', loadChildren: () => import('../../modules/clients/clients.module').then(m => m.ClientsModule)},
{path:'sales',loadChildren:()=>import('../sales/sales.module').then(m=>m.SalesModule)}

]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class Dashboard_RoutingModule { }
