import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
        component: CreateCarAdComponent
    },
    {
        path: 'edit/:id',
        component: EditCarComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CarRoutingModule { }
