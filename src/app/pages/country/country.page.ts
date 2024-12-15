import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonCardContent,
  IonButton,
  IonIcon,
} from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { CountriesService, Country } from 'src/app/services/countries.service';
import { addIcons } from 'ionicons';
import { newspaperOutline, sunnyOutline } from 'ionicons/icons';

@Component({
  selector: 'app-country',
  templateUrl: './country.page.html',
  styleUrls: ['./country.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonButton,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
  ],
})
export class CountryPage implements OnInit {
  countryObject: Country | null = null;

  private route = inject(ActivatedRoute);
  private countriesService = inject(CountriesService);

  constructor() {
    addIcons({ newspaperOutline, sunnyOutline });
  }

  ngOnInit() {
    const countryName = this.route.snapshot.paramMap.get('countryName');
    this.loadCountryObject(countryName);
  }

  private async loadCountryObject(countryName: string | null) {
    if (countryName != null) {
      const countries = await this.countriesService.getCountries();
      const country = countries.find(
        (country) => country.name.official === countryName
      );
      if (country != null) this.countryObject = country;
    }
  }
}