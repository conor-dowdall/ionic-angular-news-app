import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastController: ToastController = inject(ToastController);

  async presentToast(message: string, duration: number, type: string) {
    const toast = await this.toastController.create({
      position: 'top',
      message: message,
      duration: duration,
      color: type,
    });

    await toast.present();
  }
}
