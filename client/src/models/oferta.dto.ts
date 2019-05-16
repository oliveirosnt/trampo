import {DadosUsuarioDTO} from "./dados-usuario.dto";

export interface OfertaDTO {
  id: number,
  estimativaConclusao: string,
  fornecedor: DadosUsuarioDTO,
  descricao: string,
  valor: string
}
