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
/*
calculaPecas(){
  let x = (<HTMLInputElement>document.getElementById("pecas")).value;
  console.log(x[0].preco)
  let soma = 0;
  for (let i = 0; i < x.length; i++) {
    soma= soma + x[i].preco;
    console.log(soma)
  }
  this.totalPeca = soma
  return this.totalPeca
}

  calculaPecass(){
    var totalPeca = 0;
    var pc = document.querySelectorAll("#pecas")
    //console.log(pc.item(0).value)
    var l = pc.length;
    for (let index = 0; index < pc.length; index++) {
      const element = pc[index];
      //console.log(element)
      console.log(pc.item(index).value[index].preco)
    }
  }
*/

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
    const id = parseInt(this.activatedRoute.snapshot.params['id']);
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
    let loading = await this.loadingController.create({message: 'Salvando'});
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
