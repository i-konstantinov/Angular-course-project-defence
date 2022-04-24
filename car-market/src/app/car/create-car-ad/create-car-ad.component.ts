import { Component, OnInit } from '@angular/core';
import { NgControl, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CarService } from '../car.service';

@Component({
  selector: 'app-create-car-ad',
  templateUrl: './create-car-ad.component.html',
  styleUrls: ['./create-car-ad.component.css']
})
export class CreateCarAdComponent {

  constructor(
    private carService: CarService,
    private router: Router
    ) { }

  createAdHandler(form: NgForm) {
    let carAd = form.value;
    carAd.isSwappable == "yes" ? carAd.isSwappable = true : carAd.isSwappable = false;
    carAd.authorId = "6256f46c9531f6746645e2ab";
    this.carService.createAd(carAd).subscribe(
      () => this.router.navigate(['/catalog'])
    );
  }
}