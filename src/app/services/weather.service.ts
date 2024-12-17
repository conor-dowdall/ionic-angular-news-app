import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { environment } from 'src/environments/environment';

export enum WeatherUnits {
  Standard = 'standard',
  Metric = 'metric',
  Imperial = 'imperial',
}

export interface WeatherRootObject {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface Sys {
  country: string;
  sunrise: number;
  sunset: number;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Coord {
  lon: number;
  lat: number;
}

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor() {}

  async getWeather(
    lat: string,
    lon: string,
    units: string
  ): Promise<WeatherRootObject> {
    try {
      console.log('Fetching weather from remote API.');
      const response = await CapacitorHttp.request({
        method: 'GET',
        url: environment.weatherBaseUrl,
        params: {
          lat: lat,
          lon: lon,
          units: units,
          APPID: environment.weatherApiKey,
        },
      });

      // Check for valid response data
      if (
        typeof response === 'object' &&
        response !== null &&
        !Array.isArray(response)
      ) {
        return response.data;
      }
      throw new Error('API response is invalid or malformed.');
    } catch (error) {
      console.error('Error fetching weather', error);

      if (error instanceof Error)
        throw new Error(`Failed to fetch weather: ${error.message}`);

      throw new Error('Failed to fetch weather: An unknown error occurred.');
    }
  }

  async getFakeWeather(
    lat: string,
    lon: string,
    units: string
  ): Promise<WeatherRootObject> {
    return {
      coord: {
        lon: -8,
        lat: 53,
      },
      weather: [
        {
          id: 803,
          main: 'Clouds',
          description: 'broken clouds',
          icon: '04n',
        },
      ],
      base: 'stations',
      main: {
        temp: 6.62,
        feels_like: 4.56,
        temp_min: 6.62,
        temp_max: 6.62,
        pressure: 1025,
        humidity: 94,
        sea_level: 1025,
        grnd_level: 1015,
      },
      visibility: 10000,
      wind: {
        speed: 2.84,
        deg: 157,
        gust: 4.72,
      },
      clouds: {
        all: 71,
      },
      dt: 1734381819,
      sys: {
        country: 'IE',
        sunrise: 1734338416,
        sunset: 1734365724,
      },
      timezone: 0,
      id: 2963597,
      name: 'Ireland',
      cod: 200,
    };
  }
}
