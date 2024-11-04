import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutomatizarRiegoPageRoutingModule } from './automatizar-riego-routing.module';

import { AutomatizarRiegoPage } from './automatizar-riego.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutomatizarRiegoPageRoutingModule
  ],
  declarations: [AutomatizarRiegoPage]
})
export class AutomatizarRiegoPageModule {}
