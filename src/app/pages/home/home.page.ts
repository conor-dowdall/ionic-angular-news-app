import { Component, inject, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
} from '@ionic/angular/standalone';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
import { CountriesService, Country } from 'src/app/services/countries.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonList,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    SearchBarComponent,
  ],
})
export class HomePage implements OnInit {
  countries: Country[] = [];
  filteredCountries: Country[] = [];

  private countriesService = inject(CountriesService);

  constructor() {}

  ngOnInit() {
    this.getCountries();
  }

  async getCountries() {
    this.countries = await this.countriesService.getCountries();
    this.filteredCountries = this.countries;
  }

  onCountrySearchChange(searchTerm: string) {
    this.filteredCountries =
      searchTerm === ''
        ? this.countries
        : this.countries.filter((country) =>
            country.name.official.toLowerCase().includes(searchTerm)
          );
  }
}
