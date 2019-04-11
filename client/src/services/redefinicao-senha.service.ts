import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class RedefinicaoSenhaService {

    constructor(public http: HttpClient) { }

    redefinirSenha(email: String) {
        return this.http.post(
            `${API_CONFIG.baseUrl}/recuperarSenha`,
            email,
            {
                observe: 'response',
                responseType: 'json'
            });

    }
}