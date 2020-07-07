import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ordem } from '../models/ordem.interface';
import { BASE_API } from "./base-api";

@Injectable({
  providedIn: 'root'
})
export class OrdemService {

  private URI = BASE_API + 'ordens';

  constructor(
    private httpClient : HttpClient
  ) { }

  getOrdem(id: number) {
    return this.httpClient.get<Ordem>(`${this.URI}/${id}`);
  }
  
  getOrdens() {
    return this.httpClient.get<Ordem[]>(this.URI);
  }

  adicionar(ordem: Ordem) {
    return this.httpClient.post<Ordem>(this.URI, ordem);
  }

  atualizar(ordem: Ordem) {
    return this.httpClient.put<Ordem>(`${this.URI}/${ordem.id}`, ordem);
  }

  excluir(ordem: Ordem) {
    return this.httpClient.delete(`${this.URI}/${ordem.id}`);
  }

  salvar(ordem: Ordem) {
    if (ordem && ordem.id) {
      return this.atualizar(ordem);
    } else {
      return this.adicionar(ordem);
    }
  }
}
