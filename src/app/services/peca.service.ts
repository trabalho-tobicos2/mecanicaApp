import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Peca } from '../models/peca.interface';
import { BASE_API } from "./base-api";

@Injectable({
  providedIn: 'root'
})
export class PecaService {

  private URI = BASE_API + 'pecas';

  constructor(
    private httpClient : HttpClient
  ) { }

  getPecas() {
    return this.httpClient.get<Peca[]>(this.URI);
  }

  adicionar(peca: Peca) {
    return this.httpClient.post<Peca>(this.URI, peca);
  }

  atualizar(peca: Peca) {
    return this.httpClient.put<Peca>(`${this.URI}/${peca.id}`, peca);
  }

  excluir(peca: Peca) {
    return this.httpClient.delete(`${this.URI}/${peca.id}`);
  }

  getPeca(id: number) {
    return this.httpClient.get<Peca>(`${this.URI}/${id}`);
  }

  salvar(peca: Peca) {
    if (peca && peca.id) {
      return this.atualizar(peca);
    } else {
      return this.adicionar(peca);
    }
  }
}
