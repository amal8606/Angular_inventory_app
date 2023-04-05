import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleSaleComponent } from './single-sale.component';

const routes: Routes = [{ path: '', component: SingleSaleComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleSaleRoutingModule { }
