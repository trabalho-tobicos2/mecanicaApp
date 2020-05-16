import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { VeiculoService } from './../../services/veiculo.service';
import { Component, OnInit } from '@angular/core';
import { Veiculo } from 'src/app/models/veiculo.interface';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {
  veiculo: Veiculo;

  constructor(
    private veiculoService : VeiculoService,
    private ActivatedRoute: ActivatedRoute,
    private navController : NavController,
    private loadingController : LoadingController
  ) { 
    this.veiculo ={descricao:'', placa:'',renavan:'', marca:'',cor:'', modelo:'',Combustivel:''}
  }

  async ngOnInit() {
    const id = parseInt(this.ActivatedRoute.snapshot.params['id']);
    if(id){
      const loading = await this.loadingController.create({message: 'Carregando'});
      loading.present();
      this.veiculoService.getVeiculos(id).subscribe((veiculo)=> {
        this.veiculo = veiculo;
        loading.dismiss;
      });
    }
  }

  async salvar() {
    let loading = await this.loadingController.create({message: 'Salvando'});
    loading.present();

    this.veiculoService.salvar(this.veiculo)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/veiculos']);
      });
  }

}
