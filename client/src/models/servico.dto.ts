import { DadosUsuarioDTO } from "./dados-usuario.dto";
import { OfertaDTO } from "./oferta.dto";

export interface ServicoDTO {
    id: number,
    descricao: string,
    data: string,
    horario: string,
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
    isAvaliadoFornecedor: boolean,
    ofertasRecebidas?: OfertaDTO[],
    ofertaFinal?: OfertaDTO
}
