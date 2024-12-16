import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { CountryCodeAndClickedCounter } from '../../models/countryCounter.type';

@Component({
  selector: 'app-country-counter',
  imports: [MatCardModule],
  templateUrl: './country-counter.component.html',
  styleUrl: './country-counter.component.scss',
})
export class CountryCounterComponent {
  @Input({ required: true }) counter: CountryCodeAndClickedCounter | null =
    null;
}
