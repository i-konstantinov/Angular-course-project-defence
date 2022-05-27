import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { CarAdsModule } from './car-ads/car-ads.module';
import { CarAdsRoutingModule } from './car-ads/car-ads-routing.module';
import { CoreModule } from './core/core.module';
import { UserModule } from './user/user.module';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './not-found/not-found.component';

import { CarAdsService } from './car-ads/car-ads.service';
import { LoadingService } from './core/loading/loading.service';
import { ErrorsService } from './core/error/error.service';
import { UserStore } from './user/user.store';


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    CarAdsRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    UserModule,
    CarAdsModule
  ],
  providers: [
    CarAdsService,
    LoadingService,
    ErrorsService,
    UserStore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
