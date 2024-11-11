import { Component } from '@angular/core';
import { CustomHeaderComponent } from '../custom-header/custom-header.component';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {

  // Variables para almacenar los valores que se recibiran de los sensores
  lastReading: string = " "; // Ultima lectura
  Temperature: string = " "; // Temperatura en grados
  waterlevel: string = " "; // Nivel del agua como texto
  ambientHumidity: string = " "; // Humedad del ambiente en porcentaje
  soilHumidity: string = " "; // Humedad del suelo en porcentaje 
  constructor() { }
}
