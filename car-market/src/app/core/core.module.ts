import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LocalStorage } from './injection-tokens';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthActivate } from './auth/auth.activate';

import { LoadingComponent } from './loading/loading.component';
import { ErrorComponent } from './error/error.component';
import { AboutComponent } from './about/about.component';



@NgModule({
  declarations: [ 
    HeaderComponent, 
    FooterComponent,
    AboutComponent,
    LoadingComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    AboutComponent,
    ErrorComponent
  ],
  providers: [
    {
      provide: LocalStorage,
      useValue: window.localStorage
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthActivate
  ]
})
export class CoreModule { }