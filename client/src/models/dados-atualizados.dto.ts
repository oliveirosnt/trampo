export interface DadosAtualizadosDTO {
    novaFotoPerfil : string;
    novoNomeCompleto : string;
    novoLogin : string;
    novoEmail : string;
    novaEspecialidades? : string[];
    avaliacao: number;
}