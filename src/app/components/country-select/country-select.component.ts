import { Component, OnInit, inject, ViewChild } from '@angular/core';
import { CountriesService, Country } from 'src/app/services/countries.service';
import { ToastService } from 'src/app/services/toast.service';
import { SearchbarComponent } from 'src/app/components/searchbar/searchbar.component';
import { IonList, IonItem, IonLabel, IonNote } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss'],
  standalone: true,
  imports: [
    IonNote,
    IonLabel,
    IonItem,
    IonList,
    SearchbarComponent,
    RouterLink,
  ],
})
export class CountrySelectComponent implements OnInit {
  @ViewChild(SearchbarComponent)
  countrySearchbar!: SearchbarComponent;

  countries: Country[] = [];
  filteredCountries: Country[] = [];

  selectedIndex: number = -1;

  originalCountrySearchTerm = '';
  countrySearchChangeDisabled = false;

  private toastService = inject(ToastService);
  private countriesService = inject(CountriesService);
  private router = inject(Router);

  ngOnInit() {
    this.loadCountries();
  }

  private async loadCountries() {
    this.countries = await this.getSortedCountries();
  }

  private async getSortedCountries(): Promise<Country[]> {
    try {
      const countries = await this.countriesService.getCountries();
      this.toastService.presentToast('Countries loaded', 650, 'success');
      return countries.sort((a, b) => {
        return a.name.official.localeCompare(b.name.official);
      });
    } catch (error) {
      if (error instanceof Error)
        this.toastService.presentToast(
          'Try reloading. ' + error.message,
          5000,
          'danger'
        );
      else
        this.toastService.presentToast(
          'Try reloading. An unknown error occurred.',
          5000,
          'danger'
        );
      return [];
    }
  }

  setFocus() {
    this.countrySearchbar.setFocus();
  }

  onCountrySearchChange(searchTerm: string): void {
    if (this.countrySearchChangeDisabled) return;

    this.originalCountrySearchTerm = searchTerm; // Store the search term
    this.selectedIndex = -1; // Reset the selected index when the search term changes
    this.filteredCountries = this.filterCountries(searchTerm);
  }

  private filterCountries(searchTerm: string): Country[] {
    if (!searchTerm.trim()) return this.countries;

    const lowerSearchTerm = searchTerm.toLowerCase();
    let countriesSearch = this.countries.filter((country) =>
      country.name.official.toLowerCase().includes(lowerSearchTerm)
    );
    if (countriesSearch.length !== 0) return countriesSearch;

    countriesSearch = this.countries.filter((country) =>
      country.name.common.toLowerCase().includes(lowerSearchTerm)
    );
    return countriesSearch;
  }

  onCountryDownArrowKey(): void {
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

  onCountryUpArrowKey(): void {
    if (this.filteredCountries.length === 0) return;

    if (this.selectedIndex === -1) return;

    this.selectedIndex = this.selectedIndex - 1;

    this.countrySearchChangeDisabled = true;
    this.updateSearchBarText();
    this.countrySearchChangeDisabled = false;
  }

  private updateSearchBarText(): void {
    this.countrySearchbar.value =
      this.selectedIndex === -1
        ? this.originalCountrySearchTerm
        : this.filteredCountries[this.selectedIndex].name.official;
  }

  onCountryEnterKey() {
    this.router.navigate(['/country', this.countrySearchbar.value]);
  }
}
