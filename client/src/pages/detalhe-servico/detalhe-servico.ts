import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, ModalController, AlertController } from 'ionic-angular';
import { NavParams } from 'ionic-angular/navigation/nav-params';

import { AutenticacaoService } from '../../services/autenticacao.service';
import { StorageService } from '../../services/storage.service';
import { UsuarioService } from '../../services/usuario.service';
import { ServicoFornecedorService } from '../../services/servico-fornecedor.service';
import { ServicoClienteService } from '../../services/servico-cliente.service';


import { ServicoDTO } from '../../models/servico.dto';
import { DadosUsuarioDTO } from '../../models/dados-usuario.dto';

@IonicPage()
@Component({
    selector: 'page-detalhes',
    templateUrl: 'detalhe-servico.html',
})
export class DetalheServicoPage {

    nomeFornecedor: string;
    user: DadosUsuarioDTO;

    servico: ServicoDTO = {
        id: null,
        descricao: "",
        data: "",
        horario: "",
        valor: "",
        tipo: "",
        endereco: {
            nome: "",
            location : {
                lat: null,
                lng: null,
            }
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
        isAvaliadoFornecedor: null
    };

    constructor(
        public viewCtrl: ViewController,
        public alertCtrl: AlertController,
        public navParams: NavParams,
        public navCtrl: NavController,
        public modalCtrl: ModalController,
        public usuarioService: UsuarioService,
        public storageService: StorageService,
        public autenticacaoService: AutenticacaoService,
        public servicoClienteService: ServicoClienteService,
        public servicoFornecedorService: ServicoFornecedorService) { }


    ionViewDidLoad() {
        this.usuarioService.getMyUser().subscribe(
            response => {
                this.user = response['data'];

                this.servicoFornecedorService.getServicoById(this.navParams['data'].id).subscribe(
                    response => {
                        this.servico = response.body['data'];

                        if (this.user.tipo == 'CLIENTE' && this.servico.tipoStatus == 'CONCLUIDO' && !this.servico.isAvaliadoCliente) {
                            this.avaliarServico();
                        } else if (this.user.tipo == 'FORNECEDOR' && this.servico.tipoStatus == 'CONCLUIDO' && !this.servico.isAvaliadoFornecedor) {
                            this.avaliarServico();
                        }
                    });
            });
    }

    ionBackPage() {
        this.navCtrl.pop();
    }

    cadastrarServico(servico: ServicoDTO) {
        this.servicoFornecedorService.cadastrarServico(servico).subscribe(
            response => {
                let alertMessage = this.alertCtrl.create({
                    message: response.body['message'],
                    buttons: [{
                        text: 'Ok'
                    }]
                });
                alertMessage.present();
                this.navCtrl.setRoot('ListagemServicoPage');
            }, error => {
                let alertMessage = this.alertCtrl.create({
                    message: error.error['message'],
                    buttons: [{
                        text: 'Ok'
                    }]
                });
                alertMessage.present();
            });
    }

    concluirServico(servico: ServicoDTO) {
        this.servicoFornecedorService.concluirServico(servico).subscribe(
            response => {
                let alertMessage = this.alertCtrl.create({
                    message: response.body['message'],
                    buttons: [{
                        text: 'Ok'
                    }]
                });
                servico.tipoStatus = 'CONCLUIDO';
                alertMessage.present();
                this.avaliarServico();
            }, error => {
                let alertMessage = this.alertCtrl.create({
                    message: error.error['message'],
                    buttons: [{
                        text: 'Ok'
                    }]
                });
                alertMessage.present();
            });
    }



    cancelaServicoCliente(servico: ServicoDTO) {
        this.servicoClienteService.cancelaServico(servico).subscribe(
            response => {
                let alertMessage = this.alertCtrl.create({
                    message: response.body['message'],
                    buttons: [{
                        text: 'Ok'
                    }]
                });
                alertMessage.present();
                this.navCtrl.setRoot("HomePage");
            }, error => {
                let alertMessage = this.alertCtrl.create({
                    message: error.error['message'],
                    buttons: [{
                        text: 'Ok'
                    }]
                });
                alertMessage.present();
                this.navCtrl.setRoot("HomePage");
            }
        )
    }

    avaliarServico() {
        this.navCtrl.push('AvaliacaoPage', this.servico);
    }
}
