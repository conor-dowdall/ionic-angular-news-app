import {
  Component,
  OnInit,
  inject,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { CountriesService, Country } from 'src/app/services/countries.service';
import { ToastService } from 'src/app/services/toast.service';
import { CountrySearchbarComponent } from 'src/app/components/country-searchbar/country-searchbar.component';
import { IonList, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss'],
  standalone: true,
  imports: [IonItem, IonList, CountrySearchbarComponent],
})
export class CountrySelectComponent implements OnInit, AfterViewInit {
  @ViewChild(CountrySearchbarComponent)
  countrySearchbar!: CountrySearchbarComponent;

  countries: Country[] = [];
  filteredCountries: Country[] = [];

  selectedIndex: number = -1;

  originalCountrySearchTerm = '';
  countrySearchChangeDisabled = false;

  private toastService = inject(ToastService);
  private countriesService = inject(CountriesService);

  ngOnInit() {
    this.loadCountries();
  }

  ngAfterViewInit() {
    // Focus the search bar after the view has been initialized
    setTimeout(() => {
      this.countrySearchbar.setFocus();
    }, 100);
  }

  private async loadCountries() {
    this.countries = await this.getSortedCountries();
    this.filteredCountries = this.countries;
  }

  private async getSortedCountries(): Promise<Country[]> {
    try {
      const countries = await this.countriesService.getCountries();
      this.toastService.presentToast(
        'Success: Countries loaded.',
        750,
        'success'
      );
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

  onCountrySearchChange(searchTerm: string): void {
    if (this.countrySearchChangeDisabled) return;

    this.originalCountrySearchTerm = searchTerm; // Store the search term
    this.selectedIndex = -1; // Reset the selected index when the search term changes
    this.filteredCountries = this.filterCountries(searchTerm);
  }

  private filterCountries(searchTerm: string): Country[] {
    if (!searchTerm.trim()) return this.countries;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return this.countries.filter((country) =>
      country.name.official.toLowerCase().includes(lowerSearchTerm)
    );
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

  onCountryEnterKey() {}
}
