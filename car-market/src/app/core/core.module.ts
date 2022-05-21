import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LocalStorage } from './injection-tokens';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthActivate } from './auth/auth.activate';
import { AuthAuthor } from './auth/auth.author';
import { LoadingComponent } from './loading/loading.component';



@NgModule({
  declarations: [ 
    HeaderComponent, 
    FooterComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent
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
    AuthActivate,
    AuthAuthor
  ]
})
export class CoreModule { }