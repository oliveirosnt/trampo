import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { ServicoDTO } from "../models/servico.dto";
import {OfertaDTO} from "../models/oferta.dto";

@Injectable()
export class ServicoClienteService {

    constructor(public http: HttpClient){
    }

    cadastraServicoCliente(servico: ServicoDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/api/servicos/cliente`,
        servico,
        {
            observe: 'response',
            responseType: 'json'
        });

    }

    getServicos(){
        return this.http.get(`${API_CONFIG.baseUrl}/api/servicos/cliente`,
        {
            observe: 'response',
            responseType: 'json'
        });
    }

    getHistorico(){
        return this.http.get(`${API_CONFIG.baseUrl}/api/servicos/cliente/historico`,
        {
            observe: 'response',
            responseType: 'json'
        });
    }

    cancelaServico(servico: ServicoDTO){
        return this.http.post(`${API_CONFIG.baseUrl}/api/servicos/cliente/cancelar`,
        servico,
        {
            observe: 'response',
            responseType: 'json'
        });
    }

    aceitarServico(servico: ServicoDTO, oferta: OfertaDTO) {
      const servicoComOferta = { servico: servico, oferta: oferta };
      return this.http.post(`${API_CONFIG.baseUrl}/api/servicos/cliente/aceitar_oferta`,
        servicoComOferta, {
          observe: 'response',
          responseType: 'json'
        })
    }

}
