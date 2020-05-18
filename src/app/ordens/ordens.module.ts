import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdensPageRoutingModule } from './ordens-routing.module';

import { OrdensPage } from './ordens.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdensPageRoutingModule
  ],
  declarations: [OrdensPage]
})
export class OrdensPageModule {}
