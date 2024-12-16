import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryCode } from '../models/countryCode.interface';

const url = 'https://api.academy.incision.care/countries';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  getCountries(): Observable<CountryCode[]> {
    return this.http.get<CountryCode[]>(url);
  }
}
