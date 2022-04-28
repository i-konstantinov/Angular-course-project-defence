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
import { AuthInterceptor } from './core/auth.interceptor';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CarRoutingModule,
    AppRoutingModule,
    CoreModule,
    UserModule,
    CarModule,
    
  ],
  providers: [
    UserService,
    CarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
