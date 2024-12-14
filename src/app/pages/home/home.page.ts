import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import { settings } from 'ionicons/icons';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonIcon,
  IonContent,
} from '@ionic/angular/standalone';
import { CountrySelectComponent } from 'src/app/components/country-select/country-select.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonIcon,
    IonButton,
    IonTitle,
    IonToolbar,
    IonHeader,
    CountrySelectComponent,
  ],
})
export class HomePage {
  constructor() {
    addIcons({ settings });
  }
}
