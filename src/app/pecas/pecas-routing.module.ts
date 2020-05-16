import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PecasPage } from './pecas.page';

const routes: Routes = [
  {
    path: '',
    component: PecasPage
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'editar/:id',
    loadChildren: () => import('./cadastro/cadastro.module').then( m => m.CadastroPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PecasPageRoutingModule {}
