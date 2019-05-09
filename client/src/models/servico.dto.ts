import { DadosUsuarioDTO } from "./dados-usuario.dto";

export interface ServicoDTO {
    id: number,
    descricao: string,
    data: string,
    horario: string,
    valor: string,
    tipo: string,
    endereco: {
        rua: string,
        bairro: string,
        numero: string,
        complemento: string
    },
    fornecedor?: DadosUsuarioDTO,
    tipoStatus?: string,
    cliente?: DadosUsuarioDTO,
    isAvaliadoCliente: boolean,
    isAvaliadoFornecedor: boolean
}
