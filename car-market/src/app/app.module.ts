import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogComponent } from './car/catalog/catalog.component';
import { AboutComponent } from './about/about.component';
import { CoreModule } from './core/core.module';
import { CarModule } from './car/car.module';
import { CarRoutingModule } from './car/car-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    CarRoutingModule,
    AppRoutingModule,
    CoreModule,
    CarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
