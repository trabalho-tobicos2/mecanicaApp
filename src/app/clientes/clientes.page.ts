import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../models/cliente.interface';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  clientes: Cliente[];

  constructor(
    private alertController: AlertController,
    private clienteService: ClienteService,
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
    this.clienteService.getClientes().subscribe((data) => {
      this.clientes = data;
      loading.dismiss();
    });
  }

  async confirmarExclusao(cliente: Cliente) {
    let alerta = await this.alertController.create({
      header: 'Confirmação de exclusão',
      message: `Deseja excluir o cliente ${cliente.nome}?`,
      buttons: [{
        text: 'SIM',
        handler: () => {
          this.excluir(cliente);
        }
      }, {
        text: 'NÃO'
      }]
    });
    alerta.present();
  }

  private async excluir(cliente: Cliente) {
    const busyLoader = await this.loadingController.create({ message: 'Excluíndo...' });
    busyLoader.present();
    
    this.clienteService.excluir(cliente).subscribe(() => {
      this.listar()
      busyLoader.dismiss();
    });
  }

}
