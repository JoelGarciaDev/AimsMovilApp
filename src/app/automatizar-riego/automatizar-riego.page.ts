import { Component } from '@angular/core';
import { MqttService } from '../services/mqtt.service';

@Component({
  selector: 'app-automatizar-riego',
  templateUrl: './automatizar-riego.page.html',
  styleUrls: ['./automatizar-riego.page.scss'],
})
export class AutomatizarRiegoPage {
  isManual: boolean = false;
  lightLevel: number = 0; 
  soilMoisture: number = 0; 
  irrigationTime: number = 0;
  selectedHours: number = 0;
  selectedMinutes: number = 0;

  constructor(private mqttService: MqttService) {}

  confirmConfiguration() {
    const topic = 'ucol/iot/config';
    
    if (!this.isManual) {
      const autoMessage = JSON.stringify({ modo: 'auto' });
      this.mqttService.publish(topic, autoMessage);
      console.log('Modo auto enviado:', autoMessage);
    } else {
      const manualMessage = JSON.stringify({
        modo: 'manual',
        nivelLuz: this.lightLevel,
        humedadSuelo: this.soilMoisture,
        tiempoRiego: this.irrigationTime,
        horario: {
          horas: this.selectedHours,
          minutos: this.selectedMinutes,
        },
      });

      this.mqttService.publish(topic, manualMessage);

      console.log('Configuración enviada por modo manual:', manualMessage);
    }
  }
}
