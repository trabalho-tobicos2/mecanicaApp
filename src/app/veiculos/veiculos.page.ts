import { BusyLoaderService } from './../services/busy-loader.service';
import { VeiculoService } from './../services/veiculo.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Veiculo } from '../models/veiculo.interface';

@Component({
  selector: 'app-veiculos',
  templateUrl: './veiculos.page.html',
  styleUrls: ['./veiculos.page.scss'],
})
export class VeiculosPage implements OnInit {

  veiculos: Veiculo[];

  constructor(
    private veiculoService : VeiculoService,
    private busyLoader: BusyLoaderService,
    private alertControler: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
   this.listar();
  }

  async listar(){
    const busyLoader = await this.busyLoader.create('Carregando veiculos...');

    this.veiculos = await this.veiculoService.getVeiculos().toPromise();
    busyLoader.dismiss();
  }
}
