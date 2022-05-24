import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICarAd } from 'src/app/core/interfaces/car-ad';
import { ErrorsService } from 'src/app/core/error/error.service';
import { CarService } from '../car.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {

  carAd: Observable<ICarAd> | undefined;

  constructor(
    private errorsService: ErrorsService,
    private activatedRoute: ActivatedRoute,
    private carsService: CarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.carAd = this.carsService.loadAdById(id);
  }

  updateHandler(form: NgForm, id: string) {
    if (form.invalid) { return };
    const updated = form.value;
    updated.isSwappable == "" ? updated.isSwappable = false : updated.isSwappable = true;

    this.carsService.updateAd(id, updated)
      .subscribe({
        error: (err) => this.errorsService.showErrors(err.error.message),
        next: () => this.router.navigate(['/catalog'])
      });
  }

  deleteHandler(id: string) {
    if (!confirm("Are you sure you want to delete this ad?")) { return };
    this.carsService.deleteAd(id)
      .subscribe({
        error: (err) => this.errorsService.showErrors(err.error.message),
        next: () => this.router.navigate(['/catalog'])
      });
  }
}