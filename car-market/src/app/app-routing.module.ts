import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { AuthActivate } from './core/auth/auth.activate';
import { ErrorComponent } from './error/error.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/about'
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [ AuthActivate ],
        data: {
          authRequired: false,
          RedirectTo: '/'
        }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [ AuthActivate ],
        data: {
          authRequired: false,
          RedirectTo: '/'
        }
  },
  {
    path: 'myads',
    component: ProfileComponent,
    canActivate: [ AuthActivate ],
        data: {
          authRequired: true,
          RedirectTo: '/login'
        }
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
