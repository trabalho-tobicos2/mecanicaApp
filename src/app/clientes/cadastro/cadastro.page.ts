import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/models/cliente.interface';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  cliente: Cliente;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private loadingController: LoadingController
  ) {
    this.cliente = { nome: '', cpf: '', endereco: '', telefone: '', celular: '', imagem: '' };
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      // Carregar informações
      const loading = await this.loadingController.create({ message: 'Carregando' });
      loading.present();
      this.clienteService.getCliente(id).subscribe((cliente) => {
        this.cliente = cliente;
        loading.dismiss();
      });
    }
  }


  async salvar() {
    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();

    this.clienteService
      .salvar(this.cliente)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/clientes']);
      });
  }

  maskCpf(event) {
    let valorInput = event.detail.value;
    if (valorInput.length === 3) {
      valorInput += '.'
    } else if (valorInput.length === 7) {
      valorInput += '.'
    } else if (valorInput.length === 11) {
      valorInput += '-'
    }
    this.cliente.cpf = valorInput;
  }

  maskTel(event) {
    let valorInput = event.detail.value;
    if (valorInput.length === 1) {
      valorInput = '(' + valorInput
    } else if (valorInput.length === 3) {
      valorInput += ') '
    } else if (valorInput.length === 9) {
      valorInput += '-'
    }
    this.cliente.telefone = valorInput;
  }

  maskCel(event) {
    let valorInput = event.detail.value;
    if (valorInput.length === 1) {
      valorInput = '(' + valorInput
    } else if (valorInput.length === 3) {
      valorInput += ') '
    } else if (valorInput.length === 10) {
      valorInput += '-'
    }
    this.cliente.celular = valorInput;
  }

}
