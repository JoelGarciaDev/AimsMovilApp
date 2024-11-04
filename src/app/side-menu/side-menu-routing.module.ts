import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SideMenuPage } from './side-menu.page';

const routes: Routes = [
  {
    path: '',
    component: SideMenuPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'mi-jardin',
        loadChildren: () => import('../mi-jardin/mi-jardin.module').then(m => m.MiJardinPageModule)
      },
      {
        path: 'mi-perfil',
        loadChildren: () => import('../mi-perfil/mi-perfil.module').then(m => m.MiPerfilPageModule)
      },
      {
        path: 'configuracion',
        loadChildren: () => import('../configuracion/configuracion.module').then(m => m.ConfiguracionPageModule)
      },
      {
        path: 'automatizar-riego',
        loadChildren: () => import('../automatizar-riego/automatizar-riego.module').then(m => m.AutomatizarRiegoPageModule)
      },
      {
        path: 'estadisticas',
        loadChildren: () => import('../estadisticas/estadisticas.module').then(m => m.EstadisticasPageModule)
      },
      {
        path: 'informacion',
        loadChildren: () => import('../informacion/informacion.module').then(m => m.InformacionPageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SideMenuPageRoutingModule { }
