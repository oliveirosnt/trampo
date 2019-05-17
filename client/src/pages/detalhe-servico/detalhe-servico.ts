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
        public servicoFornecedorService: ServicoFornecedorService) {
      this.configurarServico();
    }

    configurarServico() {
      this.servico = this.navParams.get('servico');
      this.servico.ofertasRecebidas = this.navParams.get('ofertas');
    }

    ionViewDidLoad() {
        this.usuarioService.getMyUser().subscribe(
            response => {
                this.user = response['data'];

                this.servicoFornecedorService.getServicoById(this.navParams.get('servico').id).subscribe(
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

    ionViewWillEnter() {
      this.configurarServico();
    }

    visualizarOfertas(servico: ServicoDTO) {
      this.navCtrl.push('ListagemOfertasPage', { servico: this.servico, ofertas: this.servico.ofertasRecebidas} );
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
        this.navCtrl.push('AvaliacaoPage', { servico: this.servico });
    }

    formataConclusaoServico() {
        const estimativa = this.servico.ofertaFinal.estimativaConclusao.split(':');
        return estimativa[0] + ' horas e ' + estimativa[1] + ' minutos';
    }

    getEstadoServicoFormatado() {
        let estado = '';
        if(this.servico.tipoStatus === 'AGUARDANDO_OFERTAS') {
          estado = "Aguardando Ofertas";
        } else if (this.servico.tipoStatus === 'ACEITO') {
          estado = "Aguardando Realização";
        } else if (this.servico.tipoStatus === 'CANCELADO') {
          estado = "Cancelado";
        } else {
          estado = "Concluído";
        }

        return estado;
    }

    getDataServicoFormatada() {
      const partesData = this.servico.data.split('-');

      const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
      const mesIndex = parseInt(partesData[1]);
      return partesData[2] + ' de ' + meses[mesIndex - 1] + ' de ' + partesData[0];
    }

}
