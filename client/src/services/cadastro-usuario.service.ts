import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { DadosUsuarioDTO } from "../models/dados-usuario.dto";
import { Cliente } from "../models/cliente.model";

@Injectable()
export class CadastroUsuarioService {

    constructor(public http: HttpClient) { }

    cadastrar_cliente(dados: Cliente) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/api/cliente`,
            dados,
            {
                observe: 'response',
                responseType: 'json'
            });

    }

    cadastrar_fornecedor(dados: DadosUsuarioDTO) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/api/fornecedor`,
            dados,
            {
                observe: 'response',
                responseType: 'json'
            });
    }
}