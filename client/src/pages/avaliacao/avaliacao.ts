import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ServicoDTO } from '../../models/servico.dto';
import { AvaliacaoDTO } from '../../models/avaliacao-servico.dto';
import { AvaliacaoService } from '../../services/avaliacao.service';

@IonicPage()
@Component({
    selector: 'page-avaliacao',
    templateUrl: 'avaliacao.html'
})
export class AvaliacaoPage {

    servico: ServicoDTO = {
        id: null,
        descricao: "",
        data: "",
        horario: "",
        valor: "",
        tipo: "",
        endereco: {
            rua: "",
            bairro: "",
            numero: ""
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

    avaliar: AvaliacaoDTO = {
        avaliacao: {
            id: null,
            nota: null
        },
        servico: this.servico
    };

    constructor(
        public avaliacaoService: AvaliacaoService,
        public alertCtrl: AlertController,
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public navParams: NavParams) {
        this.servico = this.navParams['data'];
    }

    confirmarAvaliacao(avaliar: AvaliacaoDTO) {
        avaliar.servico = this.servico;

        this.avaliacaoService.avaliacaoServico(avaliar).subscribe(
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
            });
    }

    ionBackPage() {
        this.navCtrl.pop();
    }
}
