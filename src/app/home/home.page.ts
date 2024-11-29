import { Component, inject, OnInit } from '@angular/core';
import { CustomHeaderComponent } from '../custom-header/custom-header.component';
import { Database, ref, onValue } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { FirebaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  items$ = this.firebase.getRealtimeData('Statistics/daily').subscribe(data => {
    if (data) {
      this.processSensorData.call(this, data);
    }
  });

  currentHumedadAmbiente: number = 0;
  maxHumedadAmbiente: number = 0;
  minHumedadAmbiente: number = 0;
  promedioHumedadAmbiente: number = 0;

  currentIluminacion: number = 0;
  iluminacionMax: number = 0;

  lastDayRegistered: string = "";
  lastHourRegistered: string = "";

  currentHumedadSensor1: number = 0;
  maxHumedadSensor1: number = 0;
  minHumedadSensor1: number = 0;
  promedioHumedadSensor1: number = 0;

  currentHumedadSensor2: number = 0;
  maxHumedadSensor2: number = 0;
  minHumedadSensor2: number = 0;
  promedioHumedadSensor2: number = 0;

  currentTemperaturaAmbiente: number = 0;
  maxTemperaturaAmbiente: number = 0;
  minTemperaturaAmbiente: number = 0;
  promedioTemperaturaAmbiente: number = 0;

  waterLevel: number = 0;

  constructor(private firebase: FirebaseService) { }

  ngOnInit(): void {
    return;
  }

  processSensorData(data: any[]): void {
    // Buscar cada objeto por su id en el array
    const humedadAmbiente = data.find(item => item?.id === 'humedadAmbiente');
    const iluminacion = data.find(item => item?.id === 'iluminacion');
    const timestamp = data.find(item => item?.id === 'lastTimeStamp'); // Array con lastDay y lastHour
    const humedadSuelo = data.find(item => item?.id === 'humedadSuelo');
    const temperaturaAmbiente = data.find(item => item?.id === 'temperaturaAmbiente');
    const nivelAgua = data.find(item => item?.id === 'nivelAgua');

    console.log(timestamp.lastTimeStamp);

    // Mapear valores a las variables
    this.currentHumedadAmbiente = humedadAmbiente?.currentHumedadAmbiente || 0;
    this.maxHumedadAmbiente = humedadAmbiente?.maxHumedadAmbiente || 0;
    this.minHumedadAmbiente = humedadAmbiente?.minHumedadAmbiente || 0;

    this.currentIluminacion = iluminacion?.currentIluminacion || 0;
    this.iluminacionMax = iluminacion?.iluminacionMax || 0;

    // Extraer lastDay y lastHour del array de fecha/hora
    // if (timestamp) {
    //   // Asumiendo que lastDay y lastHour están en el formato mostrado
    //   const dateComponents = timestamp.slice(0, 9); // Tomar los primeros 9 elementos
    //   this.lastDayRegistered = `${dateComponents[1]}/${dateComponents[3]}/${dateComponents[5]}`;
    //   this.lastHourRegistered = `${dateComponents[7]}:${dateComponents[9]}`;
    // }

    // Convierte el timestamp a milisegundos (JavaScript usa milisegundos en Date)
    const date = new Date(timestamp.lastTimeStamp * 1000);

    // Extrae el día, mes y año
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son base 0
    const year = date.getFullYear();

    // Formatea la fecha como dd/mm/aaaa
    const formattedDate = `${day}/${month}/${year}`;

    this.lastDayRegistered = formattedDate;

    // Extrae hora, minutos y segundos
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    // Formatea la hora como hh:mm:ss
    const formattedTime = `${hours}:${minutes}`;

    this.lastHourRegistered = formattedTime;

    this.currentHumedadSensor1 = humedadSuelo?.currentHumedadSensor1 || 0;
    this.maxHumedadSensor1 = humedadSuelo?.maxHumedadSensor1 || 0;
    this.minHumedadSensor1 = humedadSuelo?.minHumedadSensor1 || 0;

    this.currentTemperaturaAmbiente = temperaturaAmbiente?.currentTemperaturaAmbiente || 0;
    this.maxTemperaturaAmbiente = temperaturaAmbiente?.maxTemperaturaAmbiente || 0;
    this.minTemperaturaAmbiente = temperaturaAmbiente?.minTemperaturaAmbiente || 0;

    this.waterLevel = nivelAgua?.estanque1 || 0;
  }
}