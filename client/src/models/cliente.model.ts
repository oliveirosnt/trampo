import { Usuario } from "./usuario.model";

export class Cliente extends Usuario {

    public static parseFromCliente(json: any): Cliente {
        const cliente = new Cliente();

        if (json) {
            cliente.nomeCompleto = json.nomeCompleto;
            cliente.login = json.login;
            cliente.email = json.email;
            cliente.senha = json.senha;
            cliente.fotoPerfil = "";
        }

        return cliente;
    }
}
