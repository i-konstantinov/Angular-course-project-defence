import { Component, OnDestroy } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../car.service';
import { UserService } from 'src/app/user/user.service';
import { ErrorsService } from 'src/app/error/error.service';

@Component({
  selector: 'app-create-car-ad',
  templateUrl: './create-car-ad.component.html',
  styleUrls: ['./create-car-ad.component.css']
})
export class CreateCarAdComponent {

  constructor(
    private errorsService: ErrorsService,
    private carService: CarService,
    private router: Router
  ) { }

  createAdHandler(form: NgForm) {
    if (form.invalid) { return }
    
    let carAd = form.value;

    carAd.isSwappable == "" ? carAd.isSwappable = false : null;

    this.carService.createAd(carAd).subscribe({
      error: (err) => this.errorsService.showErrors(err.error.message),
      complete: () => this.router.navigate(['/catalog'])
    });
  }
}