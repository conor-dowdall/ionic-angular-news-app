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
} from 'src/app/services/weather.service';

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

  weatherResults: WeatherRootObject | null = null;

  countryName: string | null = null;
  lat: string | null = null;
  lng: string | null = null;

  weatherFailed: boolean = false;

  constructor() {}

  ngOnInit() {
    this.countryName = this.route.snapshot.paramMap.get('countryName');
    this.lat = this.route.snapshot.paramMap.get('lat');
    this.lng = this.route.snapshot.paramMap.get('lng');
    if (this.lat && this.lng) this.loadWeather(this.lat, this.lng);
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
      this.toastService.presentToast('News loaded', 650, 'success');
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
