import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ICarAd } from 'src/app/core/interfaces/car-ad';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { ErrorsService } from 'src/app/core/error/error.service';
import { CarService } from '../car.service';
import { UserStore } from 'src/app/user/user.store';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  carAd: Observable<ICarAd> | undefined;
  userIsAuthor: boolean = false;

  constructor(
    private errorsService: ErrorsService,
    private loadingService: LoadingService,
    private carService: CarService,
    private userStore: UserStore,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    let userId: string;
    this.userStore.user$.subscribe(data => userId = data._id);
    const ad$ = this.carService.loadAdById(this.activatedRoute.snapshot.params['id'])
      .pipe(
        catchError(err => {
          this.errorsService.showErrors(err.error.message, err.message);
          console.log("Error cought:", err);
          return throwError(err);
        }),
        tap((ad) => this.userIsAuthor = ad.authorId == userId)
      );
    const loadingAd$ = this.loadingService.showLoaderUntilCompleted(ad$);
    this.carAd = loadingAd$;
  }

  deleteHandler(id: string) {
    if (confirm("Are you sure you want to delete this ad ?")) {
      this.carService.deleteAd(id).subscribe({
        error: (err) => this.errorsService.showErrors(err.message, err.error.messages),
        complete: () => this.router.navigate(['/catalog'])
      });
    } else { return };
  }
}