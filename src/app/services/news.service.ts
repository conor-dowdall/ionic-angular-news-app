import { Injectable } from '@angular/core';
import { CapacitorHttp } from '@capacitor/core';
import { environment } from 'src/environments/environment';

export interface RootObject {
  status: string;
  totalResults: number;
  results: Result[];
  nextPage: string;
}

export interface Result {
  article_id: string;
  title: string;
  link: string;
  keywords: string[] | null;
  creator: string[] | null;
  video_url: null;
  description: null | string;
  content: string;
  pubDate: string;
  pubDateTZ: string;
  image_url: null | string;
  source_id: string;
  source_priority: number;
  source_name: string;
  source_url: string;
  source_icon: string;
  language: string;
  country: string[];
  category: string[];
  ai_tag: string;
  sentiment: string;
  sentiment_stats: string;
  ai_region: string;
  ai_org: string;
  duplicate: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor() {}

  async getNews(searchTerm: string): Promise<Result[]> {
    try {
      console.log('Fetching news from remote API.');
      const response = await CapacitorHttp.request({
        method: 'GET',
        // url: 'https:/a.b.c.d.e',
        url: environment.newsBaseUrl,
        params: { apiKey: environment.newsApiKey, country: searchTerm },
      });

      // Check for valid response data
      if (
        typeof response === 'object' &&
        response !== null &&
        !Array.isArray(response)
      ) {
        if (response.data.status !== 'success')
          throw new Error('API request unsuccessful.');

        return response.data.results;
      }
      throw new Error('API response is invalid or malformed.');
    } catch (error) {
      console.error('Error fetching news', error);

      if (error instanceof Error)
        throw new Error(`Failed to fetch news: ${error.message}`);

      throw new Error('Failed to fetch news: An unknown error occurred.');
    }
  }
}
