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
    carAd.isSwappable == "yes" ? carAd.isSwappable = true : carAd.isSwappable = false;
    // carAd.authorId = "6256f46c9531f6746645e2ab";
    carAd.authorId = this.userService.currentUser!._id;
    this.carService.createAd(carAd).subscribe({
      error: (err) => console.log(err.error.message),
      next: () => this.router.navigate(['/catalog'])
    });
  }
}