import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuickSaleComponent } from './quick-sale.component';

const routes: Routes = [{ path: '', component:QuickSaleComponent ,
children:[{ path: ':id', loadChildren: () => import('../single-sale/single-sale.module').then(m => m.SingleSaleModule) }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class quickSaleRoutingModule { }