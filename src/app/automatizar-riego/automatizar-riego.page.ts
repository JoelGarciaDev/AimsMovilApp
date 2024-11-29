import { Component } from '@angular/core';
import { MqttService } from '../services/mqtt.service';

@Component({
  selector: 'app-automatizar-riego',
  templateUrl: './automatizar-riego.page.html',
  styleUrls: ['./automatizar-riego.page.scss'],
})
export class AutomatizarRiegoPage {
  isAuto: boolean = false;
  lightLevel: number = 0; 
  soilMoisture: number = 0; 
  irrigationTime: number = 0;
  selectedHours: number = 0;
  selectedMinutes: number = 0;

  constructor(private mqttService: MqttService) {}

  confirmConfiguration() {
    const topic = 'ucol/iot/config';
    
    if (!this.isAuto) {
      const manualMessage = JSON.stringify({ modo: 'manual' });
      this.mqttService.publish(topic, manualMessage);
      console.log('Modo auto enviado:', manualMessage);
    } else {
      const autoMessage = JSON.stringify({
        modo: 'auto',
        nivelLuz: this.lightLevel,
        humedadSuelo: this.soilMoisture,
      });

      this.mqttService.publish(topic, autoMessage);

      console.log('Configuración enviada por modo manual:', autoMessage);
    }
  }
}
