import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private toastCtrl: ToastController,
    private navCtrl: NavController,
  ) { }

  ngOnInit() {
    const img = localStorage.getItem('baltagram.post');
    if (img) this.showMessage("Voce tem uma publicação não salva")
  }
  async showMessage(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 3000,
      buttons: [
        {
          icon: 'send',
          handler: () => {
            this.navCtrl.navigateForward("/post");
          }
        }
      ]
    });
    toast.present();
  }
}
