import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CountryCode } from '../../models/countryCode.interface';

@Component({
  selector: 'app-country-detail',
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './country-detail.component.html',
  styleUrl: './country-detail.component.scss',
})
export class CountryDetailComponent {
  @Input({ required: true }) country!: CountryCode;

  @Output() readonly countrySelected = new EventEmitter<CountryCode>();

  onSelect() {
    this.countrySelected.emit(this.country);
  }
}
