import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { addIcons } from 'ionicons';
import { home } from 'ionicons/icons';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonRadioGroup,
  IonItem,
  IonLabel,
  IonListHeader,
  IonList,
  IonRadio,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import { WeatherUnits } from 'src/app/services/weather.service';
import { StorageService } from 'src/app/services/storage.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonIcon,
    IonRadio,
    IonList,
    IonListHeader,
    IonLabel,
    IonItem,
    IonRadioGroup,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterLink,
  ],
})
export class SettingsPage implements OnInit {
  // Convert enum values to an array for iteration
  weatherUnits = Object.values(WeatherUnits);

  private storage: StorageService = inject(StorageService);
  storedWeatherUnits: string | null = null;

  constructor() {
    addIcons({ home });
  }

  ngOnInit() {
    this.loadStoredWeatherUnits();
  }

  handleUnitsChange(event: CustomEvent) {
    this.storage.setWeatherUnits(event.detail.value);
  }

  async loadStoredWeatherUnits() {
    this.storedWeatherUnits = await this.storage.getWeatherUnits();
  }
}
