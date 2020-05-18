import { Cliente } from './cliente.interface';
import { Veiculo } from './veiculo.interface';
import { Peca } from './peca.interface';
import { Servico } from './servico.interface';
import { Mecanico } from './mecanico.interface';

export interface Ordem {
    id?: number;
    data: Date;
    cliente: Cliente;
    veiculo: Veiculo;
    mecanico: Mecanico;
    pecas?: Peca[];
    servicos: Servico[];
    totalServico: number;
    totalPeca?: number;
    desconto?: number;
    totalBruto: number;
    totalLiquido: number
}