import { CarService } from '../car.service';
import { Component, OnInit } from '@angular/core';
import { ICarAd } from '../../core/interfaces/car-ad'

import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs'
import { LoadingService } from 'src/app/core/loading/loading.service';
import { ErrorsService } from 'src/app/core/error/error.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStore } from 'src/app/user/user.store';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit  {
  
  ads$!: Observable<ICarAd[]>;
  
  userId: string | undefined = undefined;

  searching: boolean = false;

  detailView!: ICarAd | null;

  constructor(
    private carAdsService: CarService,
    private loadingService: LoadingService,
    private errorsService: ErrorsService,
    private userStore: UserStore,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAds();
    this.userStore.user$.subscribe({
      next: (data) => {
        if (data) {
          this.userId = data._id
        }
      }
    });
  }

  getAds():void {
    const allAds$ = this.carAdsService.loadAds()
      .pipe(
        catchError(err => {
          this.errorsService.showErrors(err.error.message);
          console.log("Error :", err);
          return throwError(err);
        })
      );
    const loadingAds$ = this.loadingService.showLoaderUntilCompleted(allAds$);
    this.ads$ = loadingAds$;
  }
  

  searchHandler(form: NgForm): void {
    const query = form.value;
    query.isSwappable == '' ? query.isSwappable = false : query.isSwappable = true;

    this.searching = true;

    const results$ = this.carAdsService.searchAds(query)
      .pipe(
        catchError(err => {
          this.errorsService.showErrors(err.error.message);
          console.log("Error :", err);
          return throwError(err);
        })
      );
    const loadingResults$ = this.loadingService.showLoaderUntilCompleted(results$);
    this.ads$ = loadingResults$;
  }

  cancelSearchHandler(): void {
    this.searching = false;
    this.getAds();
  }

  showDetailsHandler(ad: ICarAd): void {
    this.detailView = ad;
  }

  onBackToBrowsing(): void {
    this.detailView = null;
  }

  deleteHandler(id: string) {
    if (confirm("Are you sure you want to delete this ad ?")) {
      const deleting$ = this.carAdsService.deleteAd(id)
      this.loadingService.showLoaderUntilCompleted(deleting$).subscribe({
        error: (err) => this.errorsService.showErrors(err.message, err.error.messages),
        complete: () => this.router.navigate(['/catalog'])
      });
    } else { return };
  }
}
