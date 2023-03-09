import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { LoginGuard } from 'src/app/authentication/login,guard';
import { LoginComponent } from '../login/login.component';

const routes: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
