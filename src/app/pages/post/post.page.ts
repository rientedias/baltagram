import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  public post: Post = new Post('', '', null);
  public filters: string[] = [];
  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage,
    private toastCrtl: ToastController,
    private navCrtl: NavController,
    private alertCrtl: AlertController,
  ) { }

  ngOnInit() {
    const data = localStorage.getItem('baltagram.post');
    if (data) this.post = JSON.parse(data);

    this.filters.push('filter-normal');
    this.filters.push('filter-1977');
    this.filters.push('filter-aden');
    this.filters.push('filter-gingham');
    this.filters.push('filter-ginza');
    this.filters.push('filter-moon');
    this.filters.push('filter-reyes');
    this.filters.push('filter-willow');

  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.post.location = `${position.coords.latitude}, ${position.coords.longitude}`;
        localStorage.setItem('baltagram.post', JSON.stringify(this.post));
      });
    }
    else {
      this.showMessage('Não foi possivel obter sua localização');
    }
  }

  async showMessage(message: string) {
    const toast = await this.toastCrtl.create({
      message: message,
      duration: 3000,

      // showCloseButton: true,
      // closeButtonText: "ok"
    });
    toast.present
  }

  async showCloseOption() {
    const alert = await this.alertCrtl.create({
      header: 'Descartar postagem?',
      message: 'Deseja descarta esta <strong>postagem</strong>',
      buttons: [
        {

          text: 'Descartar',
          role: 'cancel',
          cssClass: 'secundary',
          handler: () => {
            localStorage.removeItem('baltagram.post');
            this.close();
          }
        },
        {
          text: 'Manter',
          handler: () => {
            this.close();
          }
        }
      ]

    });
    await alert.present();
  }
  close() {
    this.navCrtl.navigateBack("/home");
  }
}
