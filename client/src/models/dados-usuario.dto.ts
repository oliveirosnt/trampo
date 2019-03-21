export interface DadosUsuarioDTO {
    id: number;
    tipo: string;
    fotoPerfil : string;
    nomeCompleto : string;
    login : string;
    email : string;
    senha?: string;
    conf_senha?: string;
    listaEspecialidades? : string[];
    avaliacao: number;
}