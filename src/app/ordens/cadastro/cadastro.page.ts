import { Component, OnInit } from '@angular/core';
import { OrdemService } from 'src/app/services/ordem.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { VeiculoService } from 'src/app/services/veiculo.service';
import { MecanicoService } from 'src/app/services/mecanico.service';
import { PecaService } from 'src/app/services/peca.service';
import { ServicoService } from 'src/app/services/servico.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { BusyLoaderService } from 'src/app/services/busy-loader.service';
import { Ordem } from 'src/app/models/ordem.interface';
import { Cliente } from 'src/app/models/cliente.interface';
import { Veiculo } from 'src/app/models/veiculo.interface';
import { Peca } from 'src/app/models/peca.interface';
import { Servico } from 'src/app/models/servico.interface';
import { Mecanico } from 'src/app/models/mecanico.interface';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  ordem: Ordem;
  data: Date;
  cliente: Cliente;
  clientes: Cliente[];
  veiculo: Veiculo;
  veiculos: Veiculo[];
  mecanico: Mecanico;
  mecanicos: Mecanico[];
  pecas: Peca[];
  servicos: Servico[];
  totalPeca: number;

  constructor(
    private clienteService: ClienteService,
    private veiculoService: VeiculoService,
    private mecanicoService: MecanicoService,
    private ordemService: OrdemService,
    private pecaService: PecaService,
    private servicoService: ServicoService,
    private activatedRoute: ActivatedRoute,
    private navController: NavController,
    private busyLoader: BusyLoaderService,
    private loadingController: LoadingController
  ) {
    this.ordem = {
      data: new Date(),
      cliente: null,
      veiculo: null,
      mecanico: null,
      pecas: [],
      servicos: [],
      totalServico: 0,
      totalPeca: 0,
      desconto: 0,
      totalBruto: 0,
      totalLiquido: 0
    };
  }

  ngOnInit() {
    this.listarClientes();
    this.listarVeiculos();
    this.listarMecanicos();
    this.listarPecas();
    this.listarServicos();
    this.carregarOrdem();
  }

  calculaPecas(event) {
    let valorInput = event.detail.value;
    let soma = 0;
    for (let i = 0; i < valorInput.length; i++) {
      soma = soma + valorInput[i].preco;
    }
    this.ordem.totalPeca = soma;
    this.calcular();
  }

  calculaServicos(event) {
    let valorInput = event.detail.value;
    let soma = 0;
    for (let i = 0; i < valorInput.length; i++) {
      soma = soma + valorInput[i].preco;
    }
    this.ordem.totalServico = soma;
    this.calcular();
  }

  calculaDesconto(event) {
    this.ordem.desconto = event.detail.value;
    this.calculaValorLiquido();
  }

  validaDesconto(event) {
    return (this.ordem.totalLiquido < 0)
  }

  calcular(){
    this.calculaValorBruto();
    this.calculaValorLiquido();
  }

  calculaValorBruto() {
    this.ordem.totalBruto = this.ordem.totalPeca + this.ordem.totalServico;
  }
  calculaValorLiquido() {
    var result = this.ordem.totalBruto - this.ordem.desconto;
    this.ordem.totalLiquido = parseFloat(result.toFixed(2));
  }

  async listarClientes() {
    this.clienteService.getClientes().subscribe((clientes) => {
      this.clientes = clientes;
    });
  }

  async listarVeiculos() {
    this.veiculoService.getVeiculos().subscribe((veiculos) => {
      this.veiculos = veiculos;
    });
  }

  async listarMecanicos() {
    this.mecanicoService.getMecanicos().subscribe((mecanicos) => {
      this.mecanicos = mecanicos;
    });
  }

  async listarPecas() {
    this.pecaService.getPecas().subscribe((pecas) => {
      this.pecas = pecas;
    });
  }

  async listarServicos() {
    this.servicoService.getServicos().subscribe((servicos) => {
      this.servicos = servicos;
    });
  }

  async carregarOrdem() {
    const id = this.activatedRoute.snapshot.params['id'];
    if (id) {
      // Carregar informações
      const loading = await this.loadingController.create({ message: 'Carregando...' });
      loading.present();
      this.ordemService.getOrdem(id).subscribe((ordem) => {
        this.ordem = ordem;
        loading.dismiss();
      });
    }
  }

  async salvar() {
    let loading = await this.loadingController.create({ message: 'Salvando' });
    loading.present();

    this.ordemService
      .salvar(this.ordem)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/ordens']);
      });
  }

  compareWith(obj1: any, obj2: any) {
    return obj1 && obj2 ? obj1.id === obj2.id : obj1 === obj2;
  };

}
