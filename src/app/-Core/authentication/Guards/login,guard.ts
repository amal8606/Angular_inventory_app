import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { authApiService } from '../../Http/Api/auth.service';
@Injectable({
    providedIn:'root',
})
export class LoginGuard implements CanActivate,CanActivateChild{
constructor(private readonly api:authApiService,
   private readonly router:Router
   ){}
   public getAuth(){
      this.api.getAuth().subscribe({
         next:()=>{},
         error:()=>{
            localStorage.clear()
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