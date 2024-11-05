import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MiJardinPageRoutingModule } from './mi-jardin-routing.module';

import { MiJardinPage } from './mi-jardin.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MiJardinPageRoutingModule,
    SharedModule
  ],
  declarations: [MiJardinPage]
})
export class MiJardinPageModule { }
