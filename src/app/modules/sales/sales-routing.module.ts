import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesComponent } from './sales.component';

const routes: Routes = [{ path: '', component: SalesComponent,
children:[{ path: 'all-sales', loadChildren: () => import('../../modules/sales/all-sales/all-sales.module').then(m => m.AllSalesModule) },
{ path: '', loadChildren: () => import('../../modules/sales/all-sales/all-sales.module').then(m => m.AllSalesModule) },


{ path: 'quicksales',loadChildren: () => import('../../modules/sales/quick-sale/quick-sale.module').then(m => m.quickSaleModule)}
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
