import { inject, Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private static toastController: ToastController = inject(ToastController);

  static async presentToast(message: string, duration: number, type: string) {
    const toast = await this.toastController.create({
      position: 'top',
      message: message,
      duration: duration,
      color: type,
    });

    await toast.present();
  }
}
