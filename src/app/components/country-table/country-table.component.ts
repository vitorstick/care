import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ApiService } from '../../data/api.service';
import { CountryCode } from '../../models/countryCode.interface';
import { CountryCodeAndClickedCounter } from '../../models/countryCounter.type';
import { CountryCounterComponent } from '../country-counter/country-counter.component';
import { CountryDetailComponent } from '../country-detail/country-detail.component';

@Component({
  selector: 'app-country-table',
  imports: [CountryDetailComponent, CountryCounterComponent, AsyncPipe],
  templateUrl: './country-table.component.html',
  styleUrl: './country-table.component.scss',
  providers: [ApiService],
})
export class CountryTableComponent {
  private apiService = inject(ApiService);
  private selectedCountries = new Map<number, CountryCodeAndClickedCounter>();

  countries$ = this.apiService.getCountries();
  lastSelectedCountry: CountryCodeAndClickedCounter | null = null;

  setSelectedCountry(country: CountryCode) {
    const countryFromList = this.selectedCountries.get(country.id);

    if (!countryFromList) {
      this.lastSelectedCountry = {
        countryCode: country,
        clickedCounter: 1,
      };
      this.setLastSelectedCountry(country, this.lastSelectedCountry);
    } else {
      const clickedCounter = countryFromList.clickedCounter + 1;
      this.lastSelectedCountry = {
        countryCode: country,
        clickedCounter,
      };
      this.setLastSelectedCountry(country, this.lastSelectedCountry);
    }
  }

  private setLastSelectedCountry(
    country: CountryCode,
    selectedCountry: CountryCodeAndClickedCounter
  ) {
    this.selectedCountries.set(country.id, selectedCountry);
  }
}
