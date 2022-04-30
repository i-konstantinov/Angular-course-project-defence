import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICarAd } from 'src/app/core/interfaces/car-ad';
import { CarService } from '../car.service';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.css']
})
export class EditCarComponent implements OnInit {

  carAd: Observable<ICarAd> | undefined;

  constructor(
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
    this.carsService.updateAd(id, form.value)
    .subscribe({
      error: (err) => {throw err},
      next: () => this.router.navigate(['/details/' + this.activatedRoute.snapshot.params['id']])
    });
  }
}
