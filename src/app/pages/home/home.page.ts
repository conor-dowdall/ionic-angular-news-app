import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
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
import { CountrySearchbarComponent } from 'src/app/components/country-searchbar/country-searchbar.component';
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
    CountrySearchbarComponent,
  ],
})
export class HomePage implements OnInit {
  countries: Country[] = [];
  filteredCountries: Country[] = [];

  selectedIndex: number = -1;

  originalCountrySearchTerm: string = '';
  countrySearchChangeDisabled = false;

  @Output() enterKey = new EventEmitter();

  private countriesService = inject(CountriesService);

  constructor() {
    addIcons({ settings });
  }

  ngOnInit() {
    this.getCountries();
  }

  async getCountries() {
    this.countries = await this.countriesService.getCountries();
    this.countries.sort((a, b) => {
      return a.name.official.localeCompare(b.name.official);
    });
  }

  onCountrySearchChange(searchTerm: string) {
    if (this.countrySearchChangeDisabled) return;

    this.originalCountrySearchTerm = searchTerm; // Store the search term
    this.selectedIndex = -1; // Reset the selected index when the search term changes

    // Filter countries based on the search term
    this.filteredCountries =
      searchTerm === ''
        ? []
        : this.countries.filter((country) =>
            country.name.official
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
  }

  onCountryDownArrowKey() {
    if (this.filteredCountries.length === 0) return;

    this.selectedIndex =
      this.selectedIndex === this.filteredCountries.length - 1
        ? -1
        : (this.selectedIndex =
            (this.selectedIndex + 1) % this.filteredCountries.length);

    this.countrySearchChangeDisabled = true;
    this.updateSearchBarText();
    this.countrySearchChangeDisabled = false;
  }

  onCountryUpArrowKey() {
    if (this.filteredCountries.length === 0) return;

    if (this.selectedIndex === -1) return;

    this.selectedIndex = this.selectedIndex - 1;

    this.countrySearchChangeDisabled = true;
    this.updateSearchBarText();
    this.countrySearchChangeDisabled = false;
  }

  private updateSearchBarText() {
    const countrySearchbar = document.querySelector(
      'ion-searchbar'
    ) as HTMLIonSearchbarElement;

    if (countrySearchbar) {
      countrySearchbar.value =
        this.selectedIndex === -1
          ? this.originalCountrySearchTerm
          : this.filteredCountries[this.selectedIndex].name.official;
    }
  }

  onCountryEnterKey() {}
}
