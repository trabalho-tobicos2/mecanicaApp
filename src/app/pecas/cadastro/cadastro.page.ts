import { Component, OnInit } from '@angular/core';
import { PecaService } from 'src/app/services/peca.service';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Peca } from 'src/app/models/Peca.interface';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  peca: Peca;

  constructor(
    private pecaService : PecaService,
    private activatedRoute : ActivatedRoute,
    private navController : NavController,
    private loadingController : LoadingController
  ) { 
    this.peca = { descricao: '', tipo: '', marca: '', cor: '', preco: null, imagemUrl: ''};
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.params['id'];       
    if(id) {
      // Carregar informações
      const loading = await this.loadingController.create({message: 'Carregando'});
      loading.present();
      this.pecaService.getPeca(id).subscribe((peca) => {
        this.peca = peca;
        loading.dismiss();
      });
    } 
  }


  async salvar() {
    let loading = await this.loadingController.create({message: 'Salvando'});
    loading.present();

    this.pecaService
      .salvar(this.peca)
      .subscribe(() => {
        loading.dismiss();
        this.navController.navigateForward(['/pecas']);
      }, () => {
        loading.dismiss();
      });
  }

}
