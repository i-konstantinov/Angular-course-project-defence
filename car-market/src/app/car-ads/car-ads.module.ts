import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { CatalogComponent } from "./catalog/catalog.component";
import { CreateCarAdComponent } from './create-car-ad/create-car-ad.component';
import { EditCarAdComponent } from './edit-car-ad/edit-car-ad.component';
import { FormsModule } from "@angular/forms";
import { YearFiledValidatorDirective } from "../core/validators/year-filed-validator.directive";
import { PriceFieldValidatorDirective } from "../core/validators/price-field-validator.directive";
import { CarAdDetailsComponent } from './car-ad-details/car-ad-details.component';


@NgModule({
    declarations: [ 
        CatalogComponent,
        CreateCarAdComponent,
        EditCarAdComponent,
        YearFiledValidatorDirective,
        PriceFieldValidatorDirective,
        CarAdDetailsComponent
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
export class CarAdsModule { }