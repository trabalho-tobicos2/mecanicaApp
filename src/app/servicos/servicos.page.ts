import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ServicoService } from '../services/servico.service';
import { Servico } from '../models/servico.interface';

@Component({
  selector: 'app-servicos',
  templateUrl: './servicos.page.html',
  styleUrls: ['./servicos.page.scss'],
})
export class ServicosPage implements OnInit {

  servicos: Servico[];

  constructor(
    private alertController: AlertController,
    private servicoService: ServicoService,
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
    this.servicoService.getServicos().subscribe((data) => {
      this.servicos = data;
      loading.dismiss();
    });
  }

  async confirmarExclusao(servico: Servico) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o serviço ${servico.descricao}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(servico);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(servico: Servico) {
    const busyLoader = await this.loadingController.create({ message: 'Excluíndo...' });
    busyLoader.present();
    
    this.servicoService.excluir(servico).subscribe(() => {
      this.listar()
      busyLoader.dismiss();
    });
  }

}
