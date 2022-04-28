import { Component, OnDestroy } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../car.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-create-car-ad',
  templateUrl: './create-car-ad.component.html',
  styleUrls: ['./create-car-ad.component.css']
})
export class CreateCarAdComponent {

  constructor(
    private carService: CarService,
    private userService: UserService,
    private router: Router
  ) { }

  createAdHandler(form: NgForm) {
    let carAd = form.value;

    carAd.isSwappable == "" ? carAd.isSwappable = false : null;

    this.carService.createAd(carAd).subscribe({
      error: (err) => console.log(err.error.message),
      complete: () => this.router.navigate(['/catalog'])
    });
  }
}