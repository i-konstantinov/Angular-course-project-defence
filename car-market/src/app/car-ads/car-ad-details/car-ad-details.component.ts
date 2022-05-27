import { Component, Input } from '@angular/core';
import { ICarAd } from 'src/app/core/interfaces/car-ad';


@Component({
  selector: 'app-car-ad-details',
  templateUrl: './car-ad-details.component.html',
  styleUrls: ['./car-ad-details.component.css']
})
export class CarAdDetailsComponent {
  @Input()
  carAd!: ICarAd;
  @Input()
  userId: string | undefined;
}