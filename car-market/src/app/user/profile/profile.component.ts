import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CarService } from 'src/app/car-ads/car.service';
import { ICarAd } from 'src/app/core/interfaces/car-ad';
import { UserService } from '../user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  userAds: Observable<ICarAd[]> | undefined;
  constructor(
    private userService: UserService
  ) {
    this.userAds = this.userService.getAdsByUser();
  }
}