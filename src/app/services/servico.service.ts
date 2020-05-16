import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Servico } from '../models/servico.interface';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {

  private URI = 'http://localhost:3000/servicos';

  constructor(
    private httpClient : HttpClient
  ) { }

  getServicos() {
    return this.httpClient.get<Servico[]>(this.URI);
  }

  adicionar(servico: Servico) {
    return this.httpClient.post<Servico>(this.URI, servico);
  }

  atualizar(servico: Servico) {
    return this.httpClient.put<Servico>(`${this.URI}/${servico.id}`, servico);
  }

  excluir(servico: Servico) {
    return this.httpClient.delete(`${this.URI}/${servico.id}`);
  }

  getServico(id: number) {
    return this.httpClient.get<Servico>(`${this.URI}/${id}`);
  }

  salvar(servico: Servico) {
    if (servico && servico.id) {
      return this.atualizar(servico);
    } else {
      return this.adicionar(servico);
    }
  }
}
