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
  countryName: string = '';
  countries: Country[] = [];
  filteredCountries: Country[] = [];

  private countriesService = inject(CountriesService);

  constructor() {}

  ngOnInit() {
    this.getCountries();
  }

  getCountries() {
    this.countriesService.getCountries().subscribe((countries) => {
      this.countries = countries;
      this.filteredCountries = countries;
      console.log(this.countries);
    });
  }

  onSearchChange() {
    const searchTerm = this.countryName.toLowerCase();
    this.filteredCountries = this.countries.filter((country) =>
      country.name.official.toLowerCase().includes(searchTerm)
    );
  }
}
