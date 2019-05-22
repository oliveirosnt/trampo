import { Component } from '@angular/core';
import { IonicPage, AlertController, NavController,  NavParams } from 'ionic-angular';

import { AutenticacaoService } from '../../services/autenticacao.service';
import { StorageService } from '../../services/storage.service';
import { EspecialidadesService } from '../../services/especialidades.service';
import { UsuarioService } from '../../services/usuario.service';
import { ServicoFornecedorService } from '../../services/servico-fornecedor.service';

import { OfertaDTO } from "../../models/oferta.dto";
import { ServicoDTO } from '../../models/servico.dto';

@IonicPage()
@Component({
  selector: 'page-cadastro-oferta',
  templateUrl: 'cadastro-oferta.html',
})
export class CadastroOfertaPage {

  	oferta: OfertaDTO = {
  		id: null,
  		estimativaConclusao: "",
    	fornecedor: {
    		id: null,
    		tipo: "",
    		fotoPerfil : "",
    		nomeCompleto : "",
    		login : "",
    		email : "",
    		avaliacao: null
    	},
    	descricao: "",
    	valor: ""
  	}

    dados_servico: ServicoDTO = {
        id: null,
        descricao: "",
        data: "",
        horario: "",
        tipo: "",
        endereco: {
            nome:"",
            location:null,
            pontoReferencia:""
        },
        isAvaliadoCliente: null,
        isAvaliadoFornecedor: null
    };

  	constructor(
  		public navCtrl: NavController,
  		public navParams: NavParams,
        public autenticacaoService: AutenticacaoService,
        public storageService: StorageService,
        public especialidadesService: EspecialidadesService,
        public cadastroServService: ServicoFornecedorService,
        public alertCtrl: AlertController,
        public usuarioService: UsuarioService){
  	   	this.dados_servico = this.navParams.get('servico');
  	   	this.oferta.fornecedor = this.dados_servico.fornecedor;
  	}

   	ionBackPage() {
      this.navCtrl.setRoot('DetalheServicoPage');
   	}

    isEnabled() {
        let isValid = false;
        if (this.oferta.estimativaConclusao && this.oferta.descricao && this.oferta.valor) {
            isValid = true;
        }
        return isValid;
    }

  	cadastrarOferta() {
        console.log(this.dados_servico);
        this.cadastroServService.adicionarOferta(this.dados_servico.id, this.oferta).subscribe(
            response => {
                let alertMessage = this.alertCtrl.create({
                    message: response.body['message'],
                    buttons: [{
                        text: 'Ok'
                    }]
                });
                alertMessage.present();
                this.navCtrl.setRoot('ListagemServicoPage');
            },
            error => {
                let alertMessage = this.alertCtrl.create({
                    message: error.error['message'],
                    buttons: [{
                        text: 'Ok'
                    }]
                });
                alertMessage.present();
            }
        );
  	}

}
