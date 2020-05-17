import { Cliente } from './cliente.interface';
import { Veiculo } from './veiculo.interface';
import { Peca } from './peca.interface';
import { ServicoService } from '../services/servico.service';

export interface Ordem {
    id?: number;
    data: Date;
    cliente: Cliente;
    veiculo: Veiculo;
    pecas?: Peca[];
    servicos: ServicoService[];
    totalServico: number;
    totalPeca?: number;
    desconto?: number,
    totalBruto: number,
    totalLiquido: number
}