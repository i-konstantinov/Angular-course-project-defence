import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICarAd } from 'src/app/core/interfaces/car-ad';
import { UserStore } from '../user.store';



@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userAds$: Observable<ICarAd[]> | undefined;
  constructor( private store: UserStore ) { }

  ngOnInit(): void {
    this.userAds$ = this.store.getAdsByUser();
  }
}