
import { Injectable } from '@angular/core'
import { ToastrService } from 'ngx-toastr'
@Injectable({
    providedIn:'root'

}
)
export class notificationService{
constructor(private toast:ToastrService){

}
showSuccess(message:any){
this.toast.success(message)
}
showWarining(message:any){
this.toast.warning(message)
}

}