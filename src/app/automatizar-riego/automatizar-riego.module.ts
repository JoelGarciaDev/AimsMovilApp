import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AutomatizarRiegoPageRoutingModule } from './automatizar-riego-routing.module';

import { AutomatizarRiegoPage } from './automatizar-riego.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AutomatizarRiegoPageRoutingModule,
    SharedModule
  ],
  declarations: [AutomatizarRiegoPage]
})
export class AutomatizarRiegoPageModule { }
