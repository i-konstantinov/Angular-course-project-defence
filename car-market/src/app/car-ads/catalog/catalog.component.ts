import { CarService } from '../car.service';
import { Component } from '@angular/core';
import { ICarAd } from '../../core/interfaces/car-ad'

import { NgForm } from '@angular/forms';
import { ISearch } from 'src/app/core/interfaces/search-fields';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {
  
  allCarAds: ICarAd[] | undefined;
  searchedAds: ICarAd[] | undefined = [];
  searching: boolean = false;

  constructor(
    private carAdsService: CarService
  ) {
    this.carAdsService.loadAds().subscribe(
      (data) => this.allCarAds = data
    )
  }
  
  cancelSearchHandler(): void {
    this.searching = false;
  }

  searchHandler(form: NgForm): void {
    const filters = form.value;
    // form.reset();
    this.searchedAds = searchFilter(this.allCarAds, filters)
    this.searching = true;
  }
}

function searchFilter(data: ICarAd[] | undefined, filters: ISearch) {
  if (!data || data.length == 0) { return data };
  
  let known: ICarAd[] = [];

  if (filters.searchBrand) {
    known = data.filter(ad => ad.brand.toLowerCase().includes(filters.searchBrand.toLowerCase()));
  }

  if (filters.searchModel) {
    if (known.length > 0) {
      known = known.filter(ad => ad.model.toLowerCase().includes(filters.searchModel.toLowerCase()));
    } else {
      known = data.filter(ad => ad.model.toLowerCase().includes(filters.searchModel.toLowerCase()));
    }
  }

  if (filters.searchLocation) {
    if (known.length > 0) {
      known = known.filter(ad => ad.location.toLowerCase().includes(filters.searchLocation.toLowerCase()));
    } else {
      known = data.filter(ad => ad.location.toLowerCase().includes(filters.searchLocation.toLowerCase()));
    }
  }

  if (filters.minPrice) {
    if (known.length > 0) {
      known = known.filter(ad => ad.price >= filters.minPrice);
    } else {
      known = data.filter(ad => ad.price >= filters.minPrice);
    }
  }

  if (filters.maxPrice) {
    if (known.length > 0) {
      known = known.filter(ad => ad.price <= filters.maxPrice);
    } else {
      known = data.filter(ad => ad.price <= filters.maxPrice);
    }
  }

  if (filters.minYear) {
    if (known.length > 0) {
      known = known.filter(ad => ad.year >= filters.minYear);
    } else {
      known = data.filter(ad => ad.year >= filters.minYear);
    }
  }

  if (filters.maxYear) {
    if (known.length > 0) {
      known = known.filter(ad => ad.year <= filters.maxYear);
    } else {
      known = data.filter(ad => ad.year <= filters.maxYear);
    }
  }

  return known;
}