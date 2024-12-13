import { Component, inject, OnInit, ViewChild } from '@angular/core';
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
  @ViewChild(CountrySearchbarComponent) searchbar!: CountrySearchbarComponent;

  countries: Country[] = [];
  filteredCountries: Country[] = [];

  selectedIndex: number = -1;

  originalCountrySearchTerm: string = '';
  countrySearchChangeDisabled = false;

  private countriesService = inject(CountriesService);

  constructor() {
    addIcons({ settings });
  }

  ngOnInit() {
    this.loadCountries();
  }

  private async loadCountries(): Promise<void> {
    this.countries = await this.countriesService.getCountries();
    this.countries.sort((a, b) => {
      return a.name.official.localeCompare(b.name.official);
    });
  }

  onCountrySearchChange(searchTerm: string) {
    if (this.countrySearchChangeDisabled) return;

    this.originalCountrySearchTerm = searchTerm; // Store the search term
    this.selectedIndex = -1; // Reset the selected index when the search term changes
    this.filteredCountries = this.filterCountries(searchTerm);
  }

  private filterCountries(searchTerm: string): Country[] {
    if (!searchTerm.trim()) return [];
    const lowerSearchTerm = searchTerm.toLowerCase();
    return this.countries.filter((country) =>
      country.name.official.toLowerCase().includes(lowerSearchTerm)
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
    this.searchbar.value =
      this.selectedIndex === -1
        ? this.originalCountrySearchTerm
        : this.filteredCountries[this.selectedIndex].name.official;
  }

  onCountryEnterKey() {}
}
