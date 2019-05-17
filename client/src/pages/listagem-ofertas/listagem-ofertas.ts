import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ServicoDTO} from "../../models/servico.dto";

/**
 * Generated class for the ListagemOfertasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-listagem-ofertas',
  templateUrl: 'listagem-ofertas.html',
})
export class ListagemOfertasPage {

  servico: ServicoDTO = {
    id: null,
    descricao: "",
    data: "",
    horario: "",
    tipo: "",
    endereco: {
      rua: "",
      bairro: "",
      numero: "",
      complemento:""
    },
    tipoStatus: "",
    fornecedor: {
      id: null,
      login: "",
      nomeCompleto: "",
      tipo: "",
      fotoPerfil: "",
      email: "",
      avaliacao: null
    },
    cliente: {
      id: null,
      login: "",
      nomeCompleto: "",
      tipo: "",
      fotoPerfil: "",
      email: "",
      avaliacao: null
    },
    isAvaliadoCliente: null,
    isAvaliadoFornecedor: null,
    ofertaFinal: {
      id: null,
      estimativaConclusao: "",
      descricao: "",
      valor: "",
      fornecedor: {
        id: null,
        login: "",
        nomeCompleto: "",
        tipo: "",
        fotoPerfil: "",
        email: "",
        avaliacao: null
      },
    },
    ofertasRecebidas: []
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.servico = this.navParams.get('servico');
    this.servico.ofertasRecebidas = this.navParams.get('ofertas');
  }

  ionViewDidLoad() {

  }

  ionBackPage() {
    this.navCtrl.pop();
  }

}
