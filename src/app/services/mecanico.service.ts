import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mecanico } from '../models/mecanico.interface';

@Injectable({
  providedIn: 'root'
})
export class MecanicoService {

  private URI = 'http://localhost:3000/mecanicos';

  constructor(
    private httpClient : HttpClient
  ) { }

  getMecanicos() {
    return this.httpClient.get<Mecanico[]>(this.URI);
  }

  adicionar(mecanico: Mecanico) {
    return this.httpClient.post<Mecanico>(this.URI, mecanico);
  }

  atualizar(mecanico: Mecanico) {
    return this.httpClient.put<Mecanico>(`${this.URI}/${mecanico.id}`, mecanico);
  }

  excluir(mecanico: Mecanico) {
    return this.httpClient.delete(`${this.URI}/${mecanico.id}`);
  }

  getMecanico(id: number) {
    return this.httpClient.get<Mecanico>(`${this.URI}/${id}`);
  }

  salvar(mecanico: Mecanico) {
    if (mecanico && mecanico.id) {
      return this.atualizar(mecanico);
    } else {
      return this.adicionar(mecanico);
    }
  }
}
