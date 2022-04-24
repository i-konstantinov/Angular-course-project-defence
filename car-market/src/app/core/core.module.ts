import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LocalStorage } from './injection-tokens';



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
    }
  ]
})
export class CoreModule { }