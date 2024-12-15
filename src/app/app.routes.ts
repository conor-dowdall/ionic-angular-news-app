import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'country/:countryName',
    loadComponent: () =>
      import('./pages/country/country.page').then((m) => m.CountryPage),
  },
  {
    path: 'news/:countryCode',
    loadComponent: () =>
      import('./pages/news/news.page').then((m) => m.NewsPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
