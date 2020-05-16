import { VeiculoService } from './../services/veiculo.service';
import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
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
    private loadingController: LoadingController,
    private alertControler: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
   this.listar();
  }

  async listar(){
    const loading = await this.loadingController.create({
      message: 'Carregando veiculos..'
    });
    loading.present();
    this.veiculoService.getVeiculos().subscribe((data)=>{
      this.veiculos = data;
      loading.dismiss();
    })
  }

  async confirmarExclusao(veiculo: Veiculo) {
    let alerta = await this.alertControler.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o Veiculo ${veiculo.descricao}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(veiculo);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(veiculo: Veiculo) {
    const busyLoader = await this.loadingController.create({ message: 'Excluíndo...' });
    busyLoader.present();
    
    this.veiculoService.excluir(veiculo).subscribe(() => {
      this.listar()
      busyLoader.dismiss();
    });
  }

}
