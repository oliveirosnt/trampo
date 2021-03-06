import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { StorageService } from "./storage.service";
import { DadosAtualizadosDTO } from "../models/dados-atualizados.dto";
import { SenhaAtualizadaDTO } from "../models/senha-atualizada.dto";


@Injectable()
export class UsuarioService {

    cliente: any;
    fornecedor: any;

    constructor(public http: HttpClient,
        public storage: StorageService){
    }

    getMyUser() {
        return this.http.get(`${API_CONFIG.baseUrl}/api/usuarios/me`);
    }

    atualizaDados(dadosAtualizados : DadosAtualizadosDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/api/usuarios/ajustes`,
            dadosAtualizados,
            {
                observe: 'response',
                responseType: 'json'
            });
    }

    atualizaSenha(senhaAtualizada : SenhaAtualizadaDTO){
      return this.http.post(
        `${API_CONFIG.baseUrl}/api/usuarios/senha`,
        senhaAtualizada,
        {
          observe: 'response',
          responseType: 'json'
        });
    }

    atualizaFcmToken(fcmToken: any) {
      const fcmObject = { fcmToken: fcmToken };
      return this.http.patch(
        `${API_CONFIG.baseUrl}/api/usuarios/ajustes`,
        fcmObject,
        {
          observe: 'response',
          responseType: 'json'
        });
    }

}
