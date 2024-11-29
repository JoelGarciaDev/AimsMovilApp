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
    const dateTimeData = data.find(item => Array.isArray(item) && item.length > 8); // Array con lastDay y lastHour
    const sensor1 = data.find(item => item?.id === 'sensor1');
    const sensor2 = data.find(item => item?.id === 'sensor2');
    const temperaturaAmbiente = data.find(item => item?.id === 'temperaturaAmbiente');
    const nivelAgua = data.find(item => item?.id === 'nivelAgua');
    console.log(sensor1?.maxHumedadSensor1);
    // Mapear valores a las variables
    this.currentHumedadAmbiente = humedadAmbiente?.currentHumedadAmbiente || 0;
    this.maxHumedadAmbiente = humedadAmbiente?.maxHumedadAmbiente || 0;
    this.minHumedadAmbiente = humedadAmbiente?.minHumedadAmbiente || 0;

    this.currentIluminacion = iluminacion?.currentIluminacion || 0;
    this.iluminacionMax = iluminacion?.iluminacionMax || 0;

    // Extraer lastDay y lastHour del array de fecha/hora
    if (dateTimeData) {
      // Asumiendo que lastDay y lastHour están en el formato mostrado
      const dateComponents = dateTimeData.slice(0, 9); // Tomar los primeros 9 elementos
      this.lastDayRegistered = `${dateComponents[1]}/${dateComponents[3]}/${dateComponents[5]}`;
      this.lastHourRegistered = `${dateComponents[7]}:${dateComponents[9]}`;
    }

    this.currentHumedadSensor1 = sensor1?.currentHumedadSensor1 || 0;
    this.maxHumedadSensor1 = sensor1?.maxHumedadSensor1 || 0;
    this.minHumedadSensor1 = sensor1?.minHumedadSensor1 || 0;

    this.currentHumedadSensor2 = sensor2?.currentHumedadSensor2 || 0;
    this.maxHumedadSensor2 = sensor2?.maxHumedadSensor2 || 0;
    this.minHumedadSensor2 = sensor2?.minHumedadSensor2 || 0;

    this.currentTemperaturaAmbiente = temperaturaAmbiente?.currentTemperaturaAmbiente || 0;
    this.maxTemperaturaAmbiente = temperaturaAmbiente?.maxTemperaturaAmbiente || 0;
    this.minTemperaturaAmbiente = temperaturaAmbiente?.minTemperaturaAmbiente || 0;

    this.waterLevel = nivelAgua?.estanque1 || 0;
  }
}

