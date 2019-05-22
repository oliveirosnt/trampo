import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ServicoDTO} from "../../models/servico.dto";
import {AvaliacaoService} from "../../services/avaliacao.service";


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

  constructor(public navCtrl: NavController, public navParams: NavParams, public avaliacaoService: AvaliacaoService) {
    this.servico = this.navParams.get('servico');
    this.servico.ofertasRecebidas = this.navParams.get('ofertas');
  }

  getOfertasOrdenadasPorAvaliacao() {
    let ofertasRecebidas = [...this.servico.ofertasRecebidas];


    ofertasRecebidas.sort((ofertaUm, ofertaDois) => {

      if(ofertaUm.fornecedor.avaliacao >= ofertaDois.fornecedor.avaliacao && ofertaUm.valor < ofertaDois.valor) {
        return -1;
      } else if (ofertaUm.fornecedor.avaliacao == ofertaDois.fornecedor.avaliacao && ofertaUm.valor == ofertaDois.valor) {
        return 0;
      } else {
        return 1;
      }
    });

    return ofertasRecebidas;
  }

  ionViewDidLoad() {
    let logins = [];

    this.servico.ofertasRecebidas.map((oferta) => {
      logins.push(oferta.fornecedor.login);
    });

    this.avaliacaoService.getAvaliacoesUsuario(logins).subscribe((response) => {
      const avaliacoes = response.body['data'];
      this.populaOfertasComAvaliacoes(avaliacoes);
    }, (error) => {
      console.log(error);
    })
  }

  populaOfertasComAvaliacoes(avaliacoes) {
    for(let i = 0; i < this.servico.ofertasRecebidas.length; i ++) {
      const loginFornecedor = this.servico.ofertasRecebidas[i].fornecedor.login;
      let avaliacao = avaliacoes[loginFornecedor];

      if(!(avaliacao >='0' && avaliacao <= '9')) { // Se não for um numero
          avaliacao = 0;
      }
      this.servico.ofertasRecebidas[i].fornecedor.avaliacao = avaliacao;
    }
  }

  ionBackPage() {
    this.navCtrl.pop();
  }

}
