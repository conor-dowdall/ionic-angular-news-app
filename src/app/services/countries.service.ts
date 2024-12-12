import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

export interface Country {
  name: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  flag: string;
}

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private httpClient = inject(HttpClient);

  constructor() {}

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(environment.countriesAllUrl);
  }

  getCountryByName(name: string): Observable<Country[]> {
    return this.httpClient.get<Country[]>(
      `${environment.countriesOneUrl}${name}`
    );
  }
}
