import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { PecaService } from '../services/peca.service';
import { Peca } from '../models/peca.interface';

@Component({
  selector: 'app-pecas',
  templateUrl: './pecas.page.html',
  styleUrls: ['./pecas.page.scss'],
})
export class PecasPage implements OnInit {

  pecas: Peca[];

  constructor(
    private alertController: AlertController,
    private pecaService: PecaService,
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
    this.pecaService.getPecas().subscribe((data) => {
      this.pecas = data;
      loading.dismiss();
    });
  }

  async confirmarExclusao(peca: Peca) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir a peça ${peca.descricao}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(peca);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(peca: Peca) {
    const busyLoader = await this.loadingController.create({ message: 'Excluíndo...' });
    busyLoader.present();
    
    this.pecaService.excluir(peca).subscribe(() => {
      this.listar()
      busyLoader.dismiss();
    });
  }

}
