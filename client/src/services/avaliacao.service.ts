import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { AvaliacaoDTO } from '../models/avaliacao-servico.dto';

@Injectable()
export class AvaliacaoService {

    constructor(public http: HttpClient) {}

    avaliacaoServico(avaliar : AvaliacaoDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/api/usuarios/avaliacao/avaliar`,
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