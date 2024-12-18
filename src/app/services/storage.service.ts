import { inject, Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { WeatherUnits } from './weather.service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage = inject(Storage);

  constructor() {
    this.init();
  }

  private async init() {
    const storage = await this.storage.create();
    this.storage = storage;
  }

  async setItem(key: string, value: any): Promise<any> {
    await this.storage.set(key, value);
  }

  async getItem(key: string): Promise<any> {
    return await this.storage.get(key);
  }

  async removeItem(key: string): Promise<any> {
    await this.storage.remove(key);
  }

  async clear(): Promise<void> {
    await this.storage.clear();
  }

  async hasItem(key: string): Promise<boolean> {
    return (await this.storage.get(key)) !== null;
  }

  async getWeatherUnits(): Promise<WeatherUnits> {
    const storedValue: string | null = await this.getItem('weatherUnits');

    // Check if the stored value is a valid WeatherUnits enum value
    if (
      storedValue &&
      Object.values(WeatherUnits).includes(storedValue as WeatherUnits)
    ) {
      return storedValue as WeatherUnits;
    }

    return WeatherUnits.Metric;
  }

  async setWeatherUnits(weatherUnits: WeatherUnits): Promise<any> {
    await this.setItem('weatherUnits', weatherUnits);
  }
}
