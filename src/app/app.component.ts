import { Component } from '@angular/core';
import { CountryTableComponent } from './components/country-table/country-table.component';

@Component({
  selector: 'app-root',
  imports: [CountryTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'care';
}
