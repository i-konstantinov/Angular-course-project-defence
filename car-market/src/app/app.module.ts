import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
import { CoreModule } from './core/core.module';
import { CarModule } from './car-ads/car.module';
import { CarRoutingModule } from './car-ads/car-routing.module';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { FormsModule } from '@angular/forms';

import { UserService } from './user/user.service';
import { CarService } from './car-ads/car.service';
import { UserModule } from './user/user.module';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './error/error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PhoneFieldValidatorDirective } from './core/validators/phone-field-validator.directive';
import { LoadingService } from './core/loading/loading.service';
import { LoadingComponent } from './core/loading/loading.component';
import { ErrorsService } from './error/error.service';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NotFoundComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CarRoutingModule,
    AppRoutingModule,
    CoreModule,
    UserModule,
    CarModule
  ],
  providers: [
    UserService,
    CarService,
    LoadingService,
    ErrorsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
