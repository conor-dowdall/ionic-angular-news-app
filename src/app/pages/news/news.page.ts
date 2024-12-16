import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonSkeletonText,
} from '@ionic/angular/standalone';
import { NewsService, Result } from 'src/app/services/news.service';
import { ToastService } from 'src/app/services/toast.service';
import { TruncateWordsPipe } from 'src/app/shared/pipes/truncate-words.pipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
  standalone: true,
  imports: [
    IonSkeletonText,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    TruncateWordsPipe,
  ],
})
export class NewsPage implements OnInit {
  private toastService = inject(ToastService);
  private newsService = inject(NewsService);
  private route = inject(ActivatedRoute);

  countryName: string | null = null;
  newsResults: Result[] = [];

  constructor() {}

  ngOnInit() {
    this.countryName = this.route.snapshot.paramMap.get('countryName');

    const countryCode = this.route.snapshot.paramMap.get('countryCode');
    if (countryCode !== null) this.loadNews(countryCode);
  }

  private async loadNews(countryCode: string) {
    try {
      this.newsResults = await this.newsService.getNews(countryCode);
      this.toastService.presentToast('News loaded', 650, 'success');
    } catch (error) {
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
