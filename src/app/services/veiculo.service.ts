import { Veiculo } from './../models/veiculo.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class VeiculoService {
  private URI = 'http://localhost:3000/veiculos';

  constructor(
    private httpClient:HttpClient
  ) { }

  getVeiculos(){
    return this.httpClient.get<Veiculo[]>(this.URI);
  }

  excluir(veiculo: Veiculo){
    return this.httpClient.delete(`${this.URI}/${veiculo.id}`);
  }

  adicionar(veiculo: Veiculo) {
    return this.httpClient.post(this.URI, veiculo);
  }
}
