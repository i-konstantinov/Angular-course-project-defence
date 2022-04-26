import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.carAd = this.carService.loadAdById(this.activatedRoute.snapshot.params['id']);
  }

  deleteHandler(id: string) {
    this.carService.deleteAd(id).subscribe({
      error: (err) => console.log(err.error.message),
      complete: () => this.router.navigate(['/catalog'])
    });
  }
}