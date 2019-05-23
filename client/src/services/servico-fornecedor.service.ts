import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { ServicoDTO } from "../models/servico.dto";
import { OfertaDTO } from "../models/oferta.dto";

@Injectable()
export class ServicoFornecedorService {

    constructor(public http: HttpClient) { }

    getServicoById(id: number) {
        return this.http.get(`${API_CONFIG.baseUrl}/api/servicos/${id}`, 
            {
                observe: 'response',
                responseType: 'json'
            });
    }

    getServicos() {
        return this.http.get(`${API_CONFIG.baseUrl}/api/servicos/fornecedor`,
            {
                observe: 'response',
                responseType: 'json'
            });
    }

    getHistorico() {
        return this.http.get(`${API_CONFIG.baseUrl}/api/servicos/fornecedor/historico`,
            {
                observe: 'response',
                responseType: 'json'
            });
    }

    getServicosAceitos() {
        return this.http.get(`${API_CONFIG.baseUrl}/api/servicos/fornecedor/aceitos`,
            {
                observe: 'response',
                responseType: 'json'
            });
    }

    cadastrarServico(servico: ServicoDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/api/servicos/fornecedor`,
            servico,
            {
                observe: 'response',
                responseType: 'json'
            });
    }

    cancelaServico(servico: ServicoDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/api/servicos/fornecedor/cancelar`,
            servico,
            {
                observe: 'response',
                responseType: 'json'
            });
    }

    concluirServico(servico: ServicoDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/api/servicos/fornecedor/concluir`,
            servico,
            {
                observe: 'response',
                responseType: 'json'
            });
    }

    adicionarOferta(servicoId: number, oferta: OfertaDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/api/fornecedor/servicos/${servicoId}/ofertas`,
            oferta,
            {
              observe: 'response',
              responseType: 'json'
            });
    }

}