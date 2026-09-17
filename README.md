# AimsMovilApp — SiRI (Sistema de Riego Inteligente)

*[Read in English](README.en.md)*

Aplicación móvil construida con Ionic, Angular y Capacitor que muestra las estadísticas
ambientales y de riego del sistema SiRI, y permite al usuario configurar el riego
automático del cultivo.

## Componentes del proyecto

Este repositorio contiene la aplicación móvil. El proyecto completo se compone de tres
repositorios:

- **[SiRI-IoT](https://github.com/WhiteBryz/SiRI-IoT)**: firmware del ESP32 que lee los
  sensores, controla el riego y publica/recibe datos por MQTT.
- **[SiRI-API](https://github.com/WhiteBryz/SiRI-API)**: backend que se suscribe al
  tópico MQTT, guarda los datos en Firebase y expone endpoints HTTP.
- **AimsMovilApp** (este repositorio): aplicación móvil para monitorear y controlar el
  sistema.

## Arquitectura / flujo de datos

```
ESP32 (SiRI-IoT) --MQTT--> SiRI-API --Firebase RTDB--> AimsMovilApp
```

Para el monitoreo, la app lee las estadísticas directamente desde Firebase Realtime
Database (no consume los endpoints HTTP de SiRI-API). Para la configuración del riego,
la app publica directamente por MQTT (vía WebSocket) a un broker público en
`wss://broker.emqx.io:8084/mqtt`, tópico `ucol/iot/config`, usando el mismo contrato
JSON que consume el firmware de SiRI-IoT.

## Stack técnico

- **Ionic** `^8.0.0`
- **Angular** `^18.0.0`
- **Capacitor** `6.1.2`
- **@angular/fire** `^17.0.1` (cliente de Firebase Realtime Database)
- **mqtt** `^5.10.3` (cliente MQTT sobre WebSocket)
- **Ionicons** `^7.0.0`

## Estructura del proyecto

Dentro de `src/app/`:

- `home/`: dashboard principal. Muestra la lectura actual y los valores mínimo, máximo
  y promedio de los sensores, junto con la fecha de última actualización, leídos desde
  la ruta `Statistics/daily` de Firebase RTDB.
- `automatizar-riego/`: permite alternar entre modo de riego manual y automático, y
  configurar los umbrales de luz y humedad del suelo; publica la configuración por MQTT.
- `estadisticas/`: interfaz de selección de rango de fechas ya implementada; la lógica
  subyacente todavía está incompleta.
- `mi-jardin/`, `mi-perfil/`, `configuracion/`, `informacion/`: páginas stub, sin lógica
  más allá del scaffolding inicial.
- `side-menu/`: menú de navegación principal y acción de cierre de sesión; el flujo de
  cierre de sesión referencia una ruta `login` que actualmente no está definida en
  `app-routing.module.ts` (scaffolding pendiente de completar).
- `custom-header/`, `shared/`: componente de encabezado reutilizable y módulo
  compartido.

Servicios relevantes en `src/app/services/`:

- `database.service.ts` (`FirebaseService`): envuelve `@angular/fire/database`.
- `mqtt.service.ts` (`MqttService`): envuelve el paquete `mqtt`.

## Configuración

La configuración de Firebase está actualmente escrita directamente (sin variables de
entorno) en `src/environments/environment.ts` y `environment.prod.ts`, con los mismos
valores en ambos archivos. La URL del broker MQTT está escrita directamente en
`mqtt.service.ts`.

## Puesta en marcha

```bash
npm install
npm start   # ng serve
```

Este repositorio aún no tiene plataformas nativas de Capacitor agregadas (no existen
carpetas `android/` ni `ios/`). Para ejecutar en un dispositivo o emulador, primero es
necesario correr `npx cap add android` (o `ios`), y luego `npx cap sync` y
`npx cap run`.

## Estado actual

Varias páginas siguen siendo stubs pendientes de implementar (ver
"Estructura del proyecto"), y el flujo de cierre de sesión del menú lateral apunta a
una ruta `login` que todavía no existe en el enrutamiento.
