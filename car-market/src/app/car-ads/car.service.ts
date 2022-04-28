import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICarAd } from '../core/interfaces/car-ad';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const API_URL = environment.API_URL;

@Injectable()
export class CarService {

  constructor(private http: HttpClient) { }

  loadAds(): Observable<ICarAd[]> {
    const result = this.http.get<ICarAd[]>(API_URL + '/catalog');
    return result;
  }

  loadAdById(adId: string): Observable<ICarAd> {
    return this.http.get<ICarAd>(API_URL + '/catalog/' + adId);
  }

  getAdsByUser() {
    return this.http.get<ICarAd[] | []>(API_URL + '/catalog/myads');
  }

  createAd(carAd: ICarAd): Observable<ICarAd> {
    return this.http.post<ICarAd>(API_URL + '/catalog', carAd);
  }

  updateAd(id: string, carAd: ICarAd): Observable<ICarAd> {
    return this.http.put<ICarAd>(API_URL + '/catalog/' + id, carAd);
  }

  deleteAd(id: string): Observable<any> {
    return this.http.delete(API_URL + '/catalog/' + id);
  }
}
