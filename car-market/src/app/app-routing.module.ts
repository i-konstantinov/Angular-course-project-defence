import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from './core/auth/auth.activate';
import { AboutComponent } from './about/about.component';
import { ErrorComponent } from './core/error/error.component';
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
          RedirectTo: '/about'
        }
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [ AuthActivate ],
        data: {
          authRequired: false,
          RedirectTo: '/about'
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
