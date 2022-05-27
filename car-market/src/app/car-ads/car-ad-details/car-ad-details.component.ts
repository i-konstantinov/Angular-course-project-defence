import { Component, Input, OnInit, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ErrorsService } from 'src/app/core/error/error.service';
import { ICarAd } from 'src/app/core/interfaces/car-ad';
import { UserStore } from 'src/app/user/user.store';
import { EventEmitter } from '@angular/core';
import { CarService } from '../car.service';

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