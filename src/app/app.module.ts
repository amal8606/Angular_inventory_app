import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SimpleProductComponent } from '@Dashboard/products/pages/simple-product/simple-product.component';
import { ViewsalesComponent } from '@Dashboard/sales/pages/viewsales/viewsales.component';
import { productApiService } from '@Api/Products/productsApi.service';
import { quickSalesApiService } from '@Api/Sales/quickSale.service';
import { salesApiService } from '@Api/Sales/salesApi.service';
import { authApiService } from '@Api/auth.service';
import { clientApiService } from '@Api/clients/clientApi.service';
import { LoginGuard } from './-Core/authentication/Guards/login,guard';
import { GenerateDataService } from '@Services/generate-data.service';
import { notificationService } from '@Services/notification.service';
import { TokenInterceptor } from './-Core/authentication/token.interceptor';
import { ShowPasComponent } from './-Modules/Auth/Register/show-pas.component';
import { HomeComponent } from './-Modules/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowPasComponent,
    SimpleProductComponent,
    HomeComponent,
    ViewsalesComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true,
      timeOut: 3000,
      positionClass: 'toast-top-center',
      closeButton: true,
      preventDuplicates: true,
    }),
  ],
  providers: [
    LoginGuard,
    productApiService,
    notificationService,
    GenerateDataService,
    clientApiService,
    salesApiService,
    quickSalesApiService,
    authApiService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
