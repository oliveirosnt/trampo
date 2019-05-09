import { ServicoDTO } from "./servico.dto";

export interface AvaliacaoDTO {

    avaliacao: {
        id: number,
        nota: number
    },
    servico: ServicoDTO
}