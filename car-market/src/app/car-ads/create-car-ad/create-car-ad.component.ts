import { Component } from '@angular/core';
import {  NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CarAdsService } from '../car-ads.service';
import { ErrorsService } from 'src/app/core/error/error.service';

@Component({
  selector: 'app-create-car-ad',
  templateUrl: './create-car-ad.component.html',
  styleUrls: ['./create-car-ad.component.css']
})
export class CreateCarAdComponent {

  constructor(
    private errorsService: ErrorsService,
    private carAdsService: CarAdsService,
    private router: Router
  ) { }

  createAdHandler(form: NgForm) {
    if (form.invalid) { return }

    let carAd = form.value;

    carAd.isSwappable == "" ? carAd.isSwappable = false : carAd.isSwappable = true;

    this.carAdsService.createAd(carAd).subscribe({
      error: (err) => this.errorsService.showErrors(err.error.message),
      complete: () => this.router.navigate(['/catalog'])
    });
  }
}