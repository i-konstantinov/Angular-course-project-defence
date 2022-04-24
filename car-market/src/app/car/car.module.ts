import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CatalogComponent } from "./catalog/catalog.component";
import { CarDetailsComponent } from './car-details/car-details.component';
import { CreateCarAdComponent } from './create-car-ad/create-car-ad.component';
import { EditCarComponent } from './edit-car/edit-car.component';
import { FormsModule } from "@angular/forms";

@NgModule({
    declarations: [ 
        CatalogComponent,
        CarDetailsComponent,
        CreateCarAdComponent,
        EditCarComponent
    ],
    imports: [
      CommonModule,
      RouterModule,
      FormsModule
    ],
    providers: [ ],
    exports: [
        CatalogComponent,
        CreateCarAdComponent 
    ]
  })
export class CarModule { }