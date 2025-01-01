import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { take, tap } from 'rxjs';
import { ApiService } from '../../data/api.service';
import { CountryStoreService } from '../../data/country.store';
import { CountryCode } from '../../models/countryCode.interface';
import { CountryCounterComponent } from '../country-counter/country-counter.component';
import { CountryDetailComponent } from '../country-detail/country-detail.component';

@Component({
  selector: 'app-country-table',
  imports: [CountryDetailComponent, CountryCounterComponent, AsyncPipe],
  templateUrl: './country-table.component.html',
  styleUrl: './country-table.component.scss',
  providers: [ApiService, CountryStoreService],
})
export class CountryTableComponent implements OnInit {
  private _apiService = inject(ApiService);
  private _countryStoreService = inject(CountryStoreService);

  countryCounter$ = this._countryStoreService.getCountries();
  lastSelectedCountry$ = this._countryStoreService.getLastSelectedCountry();

  ngOnInit(): void {
    this._apiService
      .getCountries()
      .pipe(
        take(1),
        tap((countries) => {
          this._countryStoreService.setCountries(countries);
        })
      )
      .subscribe();
  }

  updateCounter(country: CountryCode) {
    this._countryStoreService.updateCountry(country);
  }
}
