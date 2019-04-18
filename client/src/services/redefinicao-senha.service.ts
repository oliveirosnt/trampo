import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { RedefinirSenhaWrapper } from "../models/redefinir-senha-wrapper";

@Injectable()
export class RedefinicaoSenhaService {

    constructor(public http: HttpClient) { }

    redefinirSenha(redefinirSenhaWrapper: RedefinirSenhaWrapper) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/recuperarSenha`,
          redefinirSenhaWrapper,
            {
                observe: 'response',
                responseType: 'json'
            });

    }
}
