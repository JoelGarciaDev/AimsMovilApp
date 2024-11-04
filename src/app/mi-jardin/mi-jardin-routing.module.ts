import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MiJardinPage } from './mi-jardin.page';

const routes: Routes = [
  {
    path: '',
    component: MiJardinPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiJardinPageRoutingModule {}
