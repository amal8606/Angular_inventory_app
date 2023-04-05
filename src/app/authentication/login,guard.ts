import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { apiService } from '../http services/api.service';
import { Observable } from 'rxjs';
@Injectable({
    providedIn:'root',
})
export class LoginGuard implements CanActivate,CanActivateChild{
constructor(private readonly api:apiService,
   private readonly router:Router
   ){}
   public getAuth(){
      this.api.getAuth().subscribe({
         next:()=>{},
         error:()=>{
            this.router.navigateByUrl('/login');
            return false;
         }
      })
   }
canActivate():any{
 this.getAuth()
}
canActivateChild():any {
 this.getAuth()
   
}
}