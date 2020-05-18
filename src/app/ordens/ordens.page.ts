import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { OrdemService } from '../services/ordem.service';
import { Ordem } from '../models/ordem.interface';

@Component({
  selector: 'app-ordens',
  templateUrl: './ordens.page.html',
  styleUrls: ['./ordens.page.scss'],
})
export class OrdensPage implements OnInit {

  ordens: Ordem[];

  constructor(
    private alertController: AlertController,
    private ordemService: OrdemService,
    private loadingController: LoadingController 
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.listar();
  }

  async listar() {
    const loading = await this.loadingController.create({
      message: 'Carregando'
    });
    loading.present();
    this.ordemService.getOrdens().subscribe((data) => {
      this.ordens = data;
      loading.dismiss();
    });
  }

  async confirmarExclusao(ordem: Ordem) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir a ordem ${ordem.id}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(ordem);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(ordem: Ordem) {
    const busyLoader = await this.loadingController.create({ message: 'Excluíndo...' });
    busyLoader.present();
    
    this.ordemService.excluir(ordem).subscribe(() => {
      this.listar()
      busyLoader.dismiss();
    });
  }

}
