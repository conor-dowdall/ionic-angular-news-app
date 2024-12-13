import { Component, inject, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settings } from 'ionicons/icons';
import { CountrySearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
import { CountriesService, Country } from 'src/app/services/countries.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonItem,
    IonList,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    CountrySearchBarComponent,
  ],
})
export class HomePage implements OnInit {
  countries: Country[] = [];
  filteredCountries: Country[] = [];

  private countriesService = inject(CountriesService);

  constructor() {
    addIcons({ settings });
  }

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
