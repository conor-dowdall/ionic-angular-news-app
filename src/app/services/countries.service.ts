import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

export interface Country {
  name: Name;
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: Currencies;
  idd: Idd;
  capital: string[];
  altSpellings: string[];
  region: string;
  languages: Languages;
  translations: Translations;
  latlng: number[];
  landlocked: boolean;
  area: number;
  demonyms: Demonyms;
  flag: string;
  maps: Maps;
  population: number;
  car: Car;
  timezones: string[];
  continents: string[];
  flags: Flags;
  coatOfArms: CoatOfArms;
  startOfWeek: string;
  capitalInfo: CapitalInfo;
}

export interface CapitalInfo {
  latlng: number[];
}

export interface CoatOfArms {}

export interface Flags {
  png: string;
  svg: string;
}

export interface Car {
  signs: string[];
  side: string;
}

export interface Maps {
  googleMaps: string;
  openStreetMaps: string;
}

export interface Demonyms {
  eng: Eng2;
}

export interface Eng2 {
  f: string;
  m: string;
}

export interface Translations {
  ara: Eng;
  bre: Eng;
  ces: Eng;
  cym: Eng;
  deu: Eng;
  est: Eng;
  fin: Eng;
  fra: Eng;
  hrv: Eng;
  hun: Eng;
  ita: Eng;
  jpn: Eng;
  kor: Eng;
  nld: Eng;
  per: Eng;
  pol: Eng;
  por: Eng;
  rus: Eng;
  slk: Eng;
  spa: Eng;
  srp: Eng;
  swe: Eng;
  tur: Eng;
  urd: Eng;
  zho: Eng;
}

export interface Languages {
  eng: string;
}

export interface Idd {
  root: string;
  suffixes: string[];
}

export interface Currencies {
  SHP: SHP;
}

export interface SHP {
  name: string;
  symbol: string;
}

export interface Name {
  common: string;
  official: string;
  nativeName: NativeName;
}

export interface NativeName {
  eng: Eng;
}

export interface Eng {
  official: string;
  common: string;
}

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private httpClient = inject(HttpClient);

  constructor() {}

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(environment.countriesAllUrl).pipe(
      catchError((error) => {
        console.error('Error fetching countries', error);
        return of([]);
      })
    );
  }

  getCountryByName(name: string): Observable<Country[]> {
    return this.httpClient
      .get<Country[]>(`${environment.countriesOneUrl}${name}`)
      .pipe(
        catchError((error) => {
          console.error(`Error fetching country with name: ${name}`, error);
          return of([]);
        })
      );
  }
}
