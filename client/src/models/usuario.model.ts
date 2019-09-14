export class Usuario {
    public id: number;
    public nomeCompleto: string;
    public login: string;
    public fotoPerfil: string;
    public email: string;
    public senha: string;
    public tipo: string;
    public avaliacao: number;
    public fcmToken: string;

    constructor(id?: number, nomeCompleto?: string, login?: string, fotoPerfil?: string,
        email?: string, senha?: string, tipo?: string, avaliacao?: number, fcmToken?:string) {
            this.id = id;
            this.nomeCompleto = nomeCompleto;
            this.login = login;
            this.fotoPerfil = fotoPerfil;
            this.email = email;
            this.senha = senha;
            this.tipo = tipo;
            this.avaliacao = avaliacao;
            this.fcmToken = fcmToken;
    }
}
