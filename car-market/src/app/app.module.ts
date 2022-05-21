import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CarModule } from './car-ads/car.module';
import { CarRoutingModule } from './car-ads/car-routing.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';

import { AboutComponent } from './about/about.component';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { CarService } from './car-ads/car.service';
import { LoadingService } from './core/loading/loading.service';
import { ErrorsService } from './core/error/error.service';
import { UserStore } from './user/user.store';


@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    CarRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    UserModule,
    CarModule
  ],
  providers: [
    CarService,
    LoadingService,
    ErrorsService,
    UserStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
