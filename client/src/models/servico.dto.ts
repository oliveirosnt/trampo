import { DadosUsuarioDTO } from "./dados-usuario.dto";

export interface ServicoDTO {
    id: number,
    descricao: string,
    data: string,
    horario: string,
    valor: string,
    tipo: string,
    endereco: {
        nome: string
        location : {
            lat: number,
            lng: number,
        }
    },
    fornecedor?: DadosUsuarioDTO,
    tipoStatus?: string,
    cliente?: DadosUsuarioDTO,
    isAvaliadoCliente: boolean,
    isAvaliadoFornecedor: boolean
}
