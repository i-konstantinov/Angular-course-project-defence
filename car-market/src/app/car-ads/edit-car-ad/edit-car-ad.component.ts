import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ICarAd } from 'src/app/core/interfaces/car-ad';
import { ErrorsService } from 'src/app/core/error/error.service';
import { CarAdsService } from '../car-ads.service';
import { LoadingService } from 'src/app/core/loading/loading.service';
import { UserStore } from 'src/app/user/user.store';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car-ad.component.html',
  styleUrls: ['./edit-car-ad.component.css']
})
export class EditCarAdComponent implements OnInit {

  carAd: Observable<ICarAd> | undefined;
  userId: string | undefined;

  constructor(
    private errorsService: ErrorsService,
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private carAdsService: CarAdsService,
    private userStore: UserStore,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    const ad$ = this.carAdsService.loadAdById(id);
    this.carAd = this.loadingService.showLoaderUntilCompleted(ad$);
    this.userStore.user$.subscribe((data) => {
      if (data) { this.userId = data._id }
    })
  }

  updateHandler(form: NgForm, id: string) {
    if (form.invalid) { return };
    if (this.userId != id) { this.router.navigate(['/login']) };

    const updated = form.value;
    updated.isSwappable == "" ? updated.isSwappable = false : updated.isSwappable = true;

    const update$ = this.carAdsService.updateAd(id, updated);
    
    this.loadingService.showLoaderUntilCompleted(update$).subscribe({
      error: (err) => this.errorsService.showErrors(err.error.message),
      next: () => this.router.navigate(['/myads'])
    });

  }


  deleteHandler(id: string) {
    if (!confirm("Are you sure you want to delete this ad?")) { return };
    if (this.userId != id) { this.router.navigate(['/login']) };
    
    const deleting$ = this.carAdsService.deleteAd(id);
    
    this.loadingService.showLoaderUntilCompleted(deleting$)
      .subscribe({
        error: (err) => this.errorsService.showErrors(err.error.message),
        next: () => this.router.navigate(['/myads'])
      });
  }
}