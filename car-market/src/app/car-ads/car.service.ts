import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICarAd } from '../core/interfaces/car-ad';
import { environment } from 'src/environments/environment';
import { Observable, shareReplay } from 'rxjs';
import { ISearch } from '../core/interfaces/search-fields';

const API_URL = environment.API_URL;

@Injectable({
  providedIn: "root"
})
export class CarService {
  constructor(private http: HttpClient) { }

  loadAds(): Observable<ICarAd[]> {
    return this.http.get<ICarAd[]>(API_URL + '/catalog')
      .pipe(shareReplay());
  }

  searchAds(q: ISearch): Observable<ICarAd[]> {
    return this.http.get<ICarAd[]>(API_URL + '/catalog', {
      params: {
        brand: q.brand,
        model: q.model,
        minPrice: q.minPrice,
        maxPrice: q.maxPrice,
        minYear: q.minYear,
        maxYear: q.maxYear,
        location: q.location,
        isSwappable: q.isSwappable
      }
    })
      .pipe(shareReplay());
  }

  loadAdById(adId: string): Observable<ICarAd> {
    return this.http.get<ICarAd>(API_URL + '/catalog/' + adId)
      .pipe(shareReplay());
  }

  getAdsByUser() {
    return this.http.get<ICarAd[] | []>(API_URL + '/catalog/myads')
      .pipe(shareReplay());
  }

  createAd(carAd: ICarAd): Observable<ICarAd> {
    return this.http.post<ICarAd>(API_URL + '/catalog', carAd)
      .pipe(shareReplay());
  }

  updateAd(id: string, carAd: ICarAd): Observable<ICarAd> {
    return this.http.put<ICarAd>(API_URL + '/catalog/' + id, carAd)
      .pipe(shareReplay());
  }

  deleteAd(id: string): Observable<any> {
    return this.http.delete(API_URL + '/catalog/' + id);
  }
}
