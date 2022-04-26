import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { ICarAd } from '../../core/interfaces/car-ad'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

  carAds: Observable<ICarAd[]>;
  
  constructor(
    private carAdsService: CarService
  ) {
    this.carAds = this.carAdsService.loadAds();
  }
}