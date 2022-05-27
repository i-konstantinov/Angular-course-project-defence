import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthActivate } from '../core/auth/auth.activate';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateCarAdComponent } from './create-car-ad/create-car-ad.component';
import { EditCarAdComponent } from './edit-car-ad/edit-car-ad.component';

const routes: Routes = [
    {
        path: 'catalog',
        component: CatalogComponent
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
        component: EditCarAdComponent,
        canActivate: [AuthActivate],
        data: {
            authRequired: true,
            RedirectTo: '/login'
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarAdsRoutingModule { }
