import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CountryCode } from '../models/countryCode.interface';
import { CountryCodeAndClickedCounter } from '../models/countryCounter.type';

@Injectable()
export class CountryStoreService {
  private _selectedCountries = new Map<number, CountryCodeAndClickedCounter>();
  private _countries$: BehaviorSubject<CountryCodeAndClickedCounter[]> =
    new BehaviorSubject<CountryCodeAndClickedCounter[]>([]);

  private _lastSelectedCountry$: BehaviorSubject<CountryCodeAndClickedCounter | null> =
    new BehaviorSubject<CountryCodeAndClickedCounter | null>(null);

  setCountries(countries: CountryCode[]): void {
    const countriesWithClickedCounter = countries.map((country) => {
      return { countryCode: country, clickedCounter: 0 };
    });
    this._selectedCountries = new Map(
      countriesWithClickedCounter.map((country) => [
        country.countryCode.id,
        country,
      ])
    );
    this._countries$.next(countriesWithClickedCounter);
  }

  getCountries(): Observable<CountryCodeAndClickedCounter[]> {
    return this._countries$.asObservable();
  }

  getLastSelectedCountry(): Observable<CountryCodeAndClickedCounter | null> {
    return this._lastSelectedCountry$.asObservable();
  }

  updateCountry(country: CountryCode): void {
    const countryFromList = this._selectedCountries.get(country.id);

    if (countryFromList) {
      this._setSelectedCountry(countryFromList);
      this._selectedCountries.set(country.id, {
        ...countryFromList,
        clickedCounter: countryFromList.clickedCounter + 1,
      });
    } else {
      this._selectedCountries.set(country.id, {
        countryCode: country,
        clickedCounter: 1,
      });
    }

    this._countries$.next(Array.from(this._selectedCountries.values()));
  }

  private _setSelectedCountry(country: CountryCodeAndClickedCounter): void {
    const lastSelectedCountry: CountryCodeAndClickedCounter = {
      ...country,
      clickedCounter: country ? country.clickedCounter + 1 : 1,
    };
    this.setLastSelectedCountry(lastSelectedCountry);
  }

  private setLastSelectedCountry(
    selectedCountry: CountryCodeAndClickedCounter
  ) {
    this._lastSelectedCountry$.next(selectedCountry);
  }
}
