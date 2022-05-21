import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from '../core/auth/auth.activate';
import { AuthAuthor } from '../core/auth/auth.author';
import { CarDetailsComponent } from './car-details/car-details.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateCarAdComponent } from './create-car-ad/create-car-ad.component';
import { EditCarComponent } from './edit-car/edit-car.component';

const routes: Routes = [
    {
        path: 'catalog',
        component: CatalogComponent
    },
    {
        path: 'details/:id',
        component: CarDetailsComponent
    },
    {
        path: 'create',
        component: CreateCarAdComponent,
        canActivate: [AuthActivate],
        data: {
            authRequired: true,
            RedirectTo: '/login'
        }
    },
    {
        path: 'edit/:id',
        component: EditCarComponent,
        canActivate: [AuthAuthor],
        data: {
            authAuthorRequired: true,
            RedirectTo: '/login'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarRoutingModule { }
