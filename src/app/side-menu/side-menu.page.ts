import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.page.html',
  styleUrls: ['./side-menu.page.scss'],
})
export class SideMenuPage implements OnInit {

  indexSelected: number = 0;
  pages = [
    {
      title: 'Inicio',
      url: './home',
      icon: '../assets/icon/home.svg'
    },
    {
      title: 'Mi Jardin',
      url: './mi-jardin',
      icon: '../assets/icon/mi-jardin.svg'
    },
    {
      title: 'Automatizar Riego',
      url: './automatizar-riego',
      icon: '../assets/icon/automatizar.svg'
    },
    {
      title: 'Estadísticas',
      url: './estadisticas',
      icon: '../assets/icon/estadisticas.svg'
    },
    {
      title: 'Mi Perfil',
      url: './mi-perfil',
      icon: '../assets/icon/mi-perfil.svg'
    },
    {
      title: 'Configuración',
      url: './configuracion',
      icon: '../assets/icon/config.svg'
    },
    {
      title: 'Información',
      url: './informacion',
      icon: '../assets/icon/info.svg'
    },
  ];

  constructor(public alertController: AlertController, public navCtrl: NavController) { }
  ChangeIndexSelected(i: number) {
    this.indexSelected = i;
  }

  async SignOut() {
    const alert = await this.alertController.create({
      header: 'Salir',
      message: '¿Deseas salir de la sesión?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
          }
        },
        {
          text: 'Si deseo salir',
          handler: () => {
            localStorage.removeItem("usuarioActual");
            this.navCtrl.navigateRoot('login');
          }
        }
      ]
    });
    await alert.present();
  }

  ngOnInit() {
    return;
  }

}
