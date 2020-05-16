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

  adicionar(veiculo: Veiculo) {
    return this.httpClient.post(this.URI, veiculo);
  }

  atualizar(veiculo: Veiculo) {
    return this.httpClient.put<Veiculo>(`${this.URI}/${veiculo.id}`, servico);
  }

  excluir(veiculo: Veiculo){
    return this.httpClient.delete(`${this.URI}/${veiculo.id}`);
  }

  getServico(id: number) {
    return this.httpClient.get<Veiculo>(`${this.URI}/${id}`);
  }

  salvar(veiculo: Veiculo) {
    if (veiculo && veiculo.id) {
      return this.atualizar(veiculo);
    } else {
      return this.adicionar(veiculo);
    }
  }
}
