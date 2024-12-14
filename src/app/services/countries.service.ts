import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Storage } from '@ionic/storage-angular';
import { CapacitorHttp } from '@capacitor/core';

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
  private storage = inject(Storage);

  constructor() {
    this.createStorage();
  }

  async createStorage() {
    await this.storage.create();
  }

  async getCountries(): Promise<Country[]> {
    try {
      // Try to get data from storage first
      const storedCountries = await this.storage.get('countries');

      if (storedCountries) {
        // If data is found in storage, return it
        console.log(
          'Loading countries from stored countries.',
          storedCountries
        );

        // Validate stored data before returning
        if (Array.isArray(storedCountries) && storedCountries.length > 0) {
          return storedCountries;
        } else {
          console.warn('Stored countries data is invalid, refetching.');
        }
      }

      // Fetch from API if storage is empty or invalid
      console.log('Fetching countries from remote API.');
      const response = await CapacitorHttp.request({
        method: 'GET',
        url: environment.countriesAllUrl, // Ensure the URL is correct
      });

      // Check for valid response data
      if (!response || !Array.isArray(response.data)) {
        throw new Error('API response is invalid or malformed.');
      }

      // Store valid data in Ionic Storage
      await this.storage.set('countries', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching countries', error);

      if (error instanceof Error)
        throw new Error(`Failed to fetch countries: ${error.message}`);

      throw new Error('Failed to fetch countries: An unknown error occurred.');
    }
  }
}
