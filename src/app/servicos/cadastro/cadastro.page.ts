import { Component, OnInit } from '@angular/core';
import { ServicoService } from 'src/app/services/servico.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Servico } from 'src/app/models/Servico.interface';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  servico: Servico;

  constructor(
    private servicoService : ServicoService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private loadingController : LoadingController
  ) { 
    this.servico = { descricao: '', tipo: '', cobranca: '', preco: null};
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];       
    if(id) {
      // Carregar informações
      const loading = await this.loadingController.create({message: 'Carregando'});
      loading.present();
      this.servicoService.getServico(id).subscribe((servico) => {
        this.servico = servico;
        loading.dismiss();
      });
    } 
  }


  async salvar() {
    let loading = await this.loadingController.create({message: 'Salvando'});
    loading.present();

    this.servicoService
      .salvar(this.servico)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/servicos']);
      });
  }

}
