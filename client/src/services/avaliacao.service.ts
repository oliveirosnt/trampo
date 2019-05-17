import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";

@Injectable()
export class AvaliacaoService {

    constructor(public http: HttpClient) {}

    avaliacaoServico(servicoId: number, avaliar: any){
        return this.http.post(
            `${API_CONFIG.baseUrl}/api/usuarios/servicos/${servicoId}/avaliacao/avaliar`,
            avaliar,
            {
                observe: 'response',
                responseType: 'json'
            });
    }


    getAvaliacaoServico() {
        return this.http.get(`${API_CONFIG.baseUrl}/api/usuarios/avaliacao/get`,
            {
                observe: 'response',
                responseType: 'json'
            });
    }
}
