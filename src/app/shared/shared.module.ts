// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { CustomHeaderComponent } from '../custom-header/custom-header.component';

@NgModule({
    declarations: [CustomHeaderComponent],
    imports: [
        CommonModule,
        IonicModule
    ],
    exports: [CustomHeaderComponent] // Exporta el componente para que esté disponible en otros módulos
})
export class SharedModule { }