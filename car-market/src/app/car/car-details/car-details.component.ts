import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ICarAd } from 'src/app/core/interfaces/car-ad';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent {
  carAd: Observable<ICarAd>;
  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute
  ) {
    this.carAd = this.carService.loadAdById(this.activatedRoute.snapshot.params['id']);
  }
}