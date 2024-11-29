import { Injectable } from '@angular/core';
import mqtt from 'mqtt';

@Injectable({
  providedIn: 'root',
})
export class MqttService {
  private client!: mqtt.MqttClient;
  private brokerUrl: string = 'wss://broker.emqx.io:8084/mqtt';  // Cambiar a wss://
  private port: number = 8084; // Puerto de WebSocket seguro

  constructor() {
    this.connectToBroker();
  }

  private connectToBroker() {
    this.client = mqtt.connect(this.brokerUrl, {
      clientId: `mqtt_${Math.random().toString(16).slice(2)}`,
      keepalive: 60,
      clean: true,
    });

    this.client.on('connect', () => {
      console.log('Conectado al broker MQTT');
    });

    this.client.on('error', (error: any) => {
      console.error('Error al conectar al broker MQTT:', error);
    });
  }

  public publish(topic: string, message: string) {
    if (this.client.connected) {
      this.client.publish(topic, message, { qos: 0, retain: false }, (err: any) => {
        if (err) {
          console.error('Error al publicar el mensaje:', err);
        } else {
          console.log(`Mensaje publicado en ${topic}: ${message}`);
        }
      });
    } else {
      console.error('No conectado al broker MQTT');
    }
  }

  public subscribe(topic: string) {
    if (this.client.connected) {
      this.client.subscribe(topic, { qos: 0 }, (err: any, granted: any) => {
        if (err) {
          console.error('Error al suscribirse al tema:', err);
        } else {
          console.log(`Suscrito a ${topic}`);
        }
      });
    } else {
      console.error('No conectado al broker MQTT');
    }
  }

  public onMessage(callback: (topic: string, message: string) => void) {
    if (this.client.connected) {
      this.client.on('message', (topic: string, payload: Buffer) => {
        const message = payload.toString();
        callback(topic, message);
      });
    }
  }
}
