import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VeiculosPage } from './veiculos.page';

const routes: Routes = [
  {
    path: '',
    component: VeiculosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VeiculosPageRoutingModule {}
