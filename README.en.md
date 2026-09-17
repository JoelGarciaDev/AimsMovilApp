# AimsMovilApp — SiRI (Smart Irrigation System)

*[Leer en español](README.md)*

Mobile application built with Ionic, Angular and Capacitor that displays SiRI's
environmental and irrigation sensor statistics, and lets the user configure automatic
irrigation for the crop.

## Project components

This repository contains the mobile application. The complete project is made up of
three repositories:

- **[SiRI-IoT](https://github.com/WhiteBryz/SiRI-IoT)**: ESP32 firmware that reads the
  sensors, controls irrigation, and publishes/receives data over MQTT.
- **[SiRI-API](https://github.com/WhiteBryz/SiRI-API)**: backend that subscribes to the
  MQTT topic, stores the data in Firebase and exposes HTTP endpoints.
- **AimsMovilApp** (this repository): mobile application to monitor and control the
  system.

## Architecture / data flow

```
ESP32 (SiRI-IoT) --MQTT--> SiRI-API --Firebase RTDB--> AimsMovilApp
```

For monitoring, the app reads statistics directly from Firebase Realtime Database (it
does not consume SiRI-API's HTTP endpoints). For irrigation configuration, the app
publishes directly over MQTT (via WebSocket) to a public broker at
`wss://broker.emqx.io:8084/mqtt`, topic `ucol/iot/config`, using the same JSON contract
consumed by SiRI-IoT's firmware.

## Tech stack

- **Ionic** `^8.0.0`
- **Angular** `^18.0.0`
- **Capacitor** `6.1.2`
- **@angular/fire** `^17.0.1` (Firebase Realtime Database client)
- **mqtt** `^5.10.3` (MQTT over WebSocket client)
- **Ionicons** `^7.0.0`

## Project structure

Under `src/app/`:

- `home/`: main dashboard. Shows the current reading plus the minimum, maximum and
  average sensor values, along with the last-updated timestamp, read from the
  `Statistics/daily` path in Firebase RTDB.
- `automatizar-riego/`: toggles between manual and automatic irrigation mode, and sets
  light and soil-moisture thresholds; publishes the configuration over MQTT.
- `estadisticas/`: the date-range selector UI is already implemented; the underlying
  logic is still incomplete.
- `mi-jardin/`, `mi-perfil/`, `configuracion/`, `informacion/`: stub pages, with no
  logic beyond the initial scaffolding.
- `side-menu/`: main navigation drawer and sign-out action; the sign-out flow
  references a `login` route that is not currently defined in
  `app-routing.module.ts` (scaffolding pending completion).
- `custom-header/`, `shared/`: reusable header component and shared module.

Relevant services under `src/app/services/`:

- `database.service.ts` (`FirebaseService`): wraps `@angular/fire/database`.
- `mqtt.service.ts` (`MqttService`): wraps the `mqtt` package.

## Configuration

Firebase configuration is currently hardcoded (not driven by environment variables) in
`src/environments/environment.ts` and `environment.prod.ts`, with the same values in
both files. The MQTT broker URL is hardcoded in `mqtt.service.ts`.

## Getting started

```bash
npm install
npm start   # ng serve
```

This repository does not yet have any Capacitor native platforms added (no `android/`
or `ios/` folders). To run on a device or emulator, you first need to run
`npx cap add android` (or `ios`), then `npx cap sync` and `npx cap run`.

## Current status

Several pages are still stubs pending implementation (see "Project structure"), and the
side menu's sign-out flow points to a `login` route that does not yet exist in the
routing configuration.
