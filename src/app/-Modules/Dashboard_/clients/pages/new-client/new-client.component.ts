import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { notificationService } from '@Services/notification.service'
import { clientApiService } from 'src/app/-Core/Http/Api/clients/clientApi.service';
import { GetFunctionService } from '@Services/get-function.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html'

})
export class NewClientComponent implements OnDestroy, OnInit{
  constructor(
    private readonly api: clientApiService,
    private readonly toastr: notificationService,
    private readonly functinalServ:GetFunctionService,
    private readonly router:Router,
    private readonly active:ActivatedRoute
  ) {}
  @Input()
 public clients$!:Observable<any>;
  @Input()
  public totalData!:number;
  public toOpenModel = false;

  createClient = new FormGroup({
    first_name: new FormControl('',Validators.required),
    last_name: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),
    country: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
  });
  public openModel() {
    this.toOpenModel = true;
    
  }
  public closeModal(){
    this.toOpenModel = false;
  }
  public createNewClient() {
    const body = this.createClient.value;
    this.api.addClient(body).subscribe({
      next:(response) => {
        if (response) {
          console.log(response)
          this.toastr.showSuccess(
            `New client with name ${body.first_name} added successfully`
          );
  this.functinalServ.sendClickEvent()
        }
        this.active.queryParams.subscribe(params=>{
          if(params['source']=='new'){
            this.router.navigate(['dashboard/sales'])
          }
        })
      },
      error:()=>{
        this.toastr.showError("Something went wrong, try again later");
      },
      complete:()=>{
        this.createClient.reset();
        this.toOpenModel=false;
      }
    });
  }
  ngOnInit(): void {
    this.active.queryParams.subscribe(param=>{
      if(param['source']=='new'){
   this.toOpenModel=true
      }
    })
  }
  ngOnDestroy(): void {
    console.log('finished')
    this.active.queryParams.subscribe(params=>{
      if(params['source']=='new'){
        this.router.navigate(['dashboard/sales'],{queryParams:{source:'client_created'}})
      }
    })
  }
}
