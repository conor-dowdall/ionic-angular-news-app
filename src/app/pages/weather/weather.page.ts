import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute } from '@angular/router';
import {
  WeatherRootObject,
  WeatherService,
  WeatherUnits,
} from 'src/app/services/weather.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class WeatherPage implements OnInit {
  private toastService = inject(ToastService);
  private weatherService = inject(WeatherService);
  private route = inject(ActivatedRoute);
  private storage = inject(StorageService);

  weatherResults: WeatherRootObject | null = null;
  weatherIconUrl: string | null = null;
  weatherUnits: WeatherUnits = WeatherUnits.Metric;
  weatherUnitsString: string = '℃';

  cityName: string | null = null;
  lat: string | null = null;
  lng: string | null = null;

  weatherFailed: boolean = false;

  constructor() {}

  ngOnInit() {
    this.loadUnits();
    this.cityName = this.route.snapshot.paramMap.get('cityName');
    this.lat = this.route.snapshot.paramMap.get('lat');
    this.lng = this.route.snapshot.paramMap.get('lng');
    if (this.lat && this.lng) this.loadWeather(this.lat, this.lng);
    else console.error('no lat or lng');
  }

  private async loadUnits() {
    this.weatherUnits = await this.getUnitsFromStorage();
    this.setTemperatureUnits(this.weatherUnits);
  }

  async getUnitsFromStorage(): Promise<WeatherUnits> {
    const storedValue: string | null = await this.storage.getItem('units');

    // Check if the stored value is a valid WeatherUnits enum value
    if (
      storedValue &&
      Object.values(WeatherUnits).includes(storedValue as WeatherUnits)
    ) {
      return storedValue as WeatherUnits;
    }

    return WeatherUnits.Metric;
  }

  setTemperatureUnits(units: WeatherUnits): void {
    switch (units) {
      case WeatherUnits.Metric:
        this.weatherUnitsString = '°C'; // Celsius for metric
        break;
      case WeatherUnits.Imperial:
        this.weatherUnitsString = '°F'; // Fahrenheit for imperial
        break;
      case WeatherUnits.Standard:
        this.weatherUnitsString = 'K'; // Kelvin for standard
        break;
      default:
        this.weatherUnitsString = '°C'; // Default to Celsius if no unit is set
    }
  }

  private async loadWeather(
    lat: string,
    lng: string,
    units: string = 'metric'
  ) {
    try {
      this.weatherFailed = false;
      this.weatherResults = await this.weatherService.getFakeWeather(
        lat,
        lng,
        units
      );
      this.weatherIconUrl = `https://openweathermap.org/img/wn/${this.weatherResults?.weather?.[0]?.icon}@2x.png`;
      this.toastService.presentToast('Weather loaded', 650, 'success');
    } catch (error) {
      this.weatherFailed = true;
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
    }
  }
}
