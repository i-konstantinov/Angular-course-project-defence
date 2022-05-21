import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ICarAd } from 'src/app/core/interfaces/car-ad';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { UserService } from 'src/app/user/user.service';
import { CarService } from '../car.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  carAd: Observable<ICarAd> | undefined;
  loggedUser: boolean = false;
  userIsAuthor: boolean = false;

  constructor(
    private loadingService: LoadingService,
    private carService: CarService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loggedUser = this.userService.loggedUser;
    const ad$ = this.carService.loadAdById(this.activatedRoute.snapshot.params['id'])
    .pipe(
      tap((ad) => this.userIsAuthor = ad.authorId == this.userService.currentUser?._id)
    );
    const loadingAd$ = this.loadingService.showLoaderUntilCompleted(ad$);
    this.carAd = loadingAd$;
  }

  deleteHandler(id: string) {
    if (confirm("Are you sure you want to delete this ad ?")) {
      this.carService.deleteAd(id).subscribe({
        error: (err) => console.log(err.error.message),
        complete: () => this.router.navigate(['/catalog'])
      });
    } else { return };
  }
}