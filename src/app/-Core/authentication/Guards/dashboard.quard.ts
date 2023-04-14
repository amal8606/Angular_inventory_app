import {Injectable} from '@angular/core';
import { ActivatedRoute, CanActivate } from '@angular/router';
@Injectable({
    providedIn:'root',
})
export class dashBoardGuard implements CanActivate{
constructor(){}
canActivate():boolean{
   const loggedIn=localStorage.getItem('login');
   if(loggedIn){
      return true;
   }
   else{
      return false;
   }
  }
}