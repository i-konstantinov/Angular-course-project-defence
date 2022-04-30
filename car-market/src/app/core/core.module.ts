import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LocalStorage } from './injection-tokens';
import { AuthInterceptor } from './auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthActivate } from './auth.activate';
import { AuthAuthor } from './auth.author';
import { errorHandlerProvider } from './error-handler';
import { PriceFieldValidatorDirective } from './validators/price-field-validator.directive';



@NgModule({
  declarations: [ 
    HeaderComponent, 
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent
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
    AuthAuthor,
    errorHandlerProvider
  ]
})
export class CoreModule { }