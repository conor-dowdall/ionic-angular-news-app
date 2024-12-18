import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'settings',
    loadComponent: () =>
      import('./pages/settings/settings.page').then((m) => m.SettingsPage),
  },
  {
    path: 'country/:countryName',
    loadComponent: () =>
      import('./pages/country/country.page').then((m) => m.CountryPage),
  },
  {
    path: 'news/:countryName/:countryCode',
    loadComponent: () =>
      import('./pages/news/news.page').then((m) => m.NewsPage),
  },
  {
    path: 'weather/:cityName/:lat/:lng',
    loadComponent: () =>
      import('./pages/weather/weather.page').then((m) => m.WeatherPage),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
