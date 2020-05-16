import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from '../models/cliente.interface';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private URI = 'http://localhost:3000/clientes';

  constructor(
    private httpClient : HttpClient
  ) { }

  getClientes() {
    return this.httpClient.get<Cliente[]>(this.URI);
  }

  adicionar(cliente: Cliente) {
    return this.httpClient.post<Cliente>(this.URI, cliente);
  }

  atualizar(cliente: Cliente) {
    return this.httpClient.put<Cliente>(`${this.URI}/${cliente.id}`, cliente);
  }

  excluir(cliente: Cliente) {
    return this.httpClient.delete(`${this.URI}/${cliente.id}`);
  }

  getCliente(id: number) {
    return this.httpClient.get<Cliente>(`${this.URI}/${id}`);
  }

  salvar(cliente: Cliente) {
    if (cliente && cliente.id) {
      return this.atualizar(cliente);
    } else {
      return this.adicionar(cliente);
    }
  }
}
