import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/authentication/login,guard';
import { ShowPasComponent } from 'src/app/show-pas/show-pas.component';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoginGuard],
    children: [{ path: 'register', component: ShowPasComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
