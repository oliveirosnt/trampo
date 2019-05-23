import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ServicoDTO } from '../../models/servico.dto';
//import { AvaliacaoDTO } from '../../models/avaliacao-servico.dto';
import { AvaliacaoService } from '../../services/avaliacao.service';
import { StorageService } from "../../services/storage.service";


@IonicPage()
@Component({
    selector: 'page-avaliacao',
    templateUrl: 'avaliacao.html'
})
export class AvaliacaoPage {

    userDisplayed: any;
    imgPerfil: string = 'assets/imgs/default-avatar.png';

    servico: ServicoDTO = {
        id: null,
        descricao: "",
        data: "",
        horario: "",
        tipo: "",
        endereco: {
            nome: "",
            location : {
                lat: null,
                lng: null,
            },
          pontoReferencia: ""
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

    avaliacao: any = {
      nota: 0
    };

    constructor(
        public avaliacaoService: AvaliacaoService,
        public alertCtrl: AlertController,
        public viewCtrl: ViewController,
        public navCtrl: NavController,
        public navParams: NavParams,
        public storageService: StorageService) {
    }

  ionViewDidLoad() {
      this.servico = this.navParams.get('servico');

      const usuario = this.storageService.getLocalUser()["user"]

      if(usuario["tipo"] == 'CLIENTE') {
        const fornecedor = { ...this.servico["fornecedor"] };
        this.userDisplayed = fornecedor;
        this.userDisplayed["tipo"] = 'Fornecedor';
        this.imgPerfil = fornecedor["fotoPerfil"].trim() === '' ? 'assets/imgs/default-avatar.png': 'data:image/jpeg;base64,' + fornecedor["fotoPerfil"]
      } else {
        const cliente = { ...this.servico["cliente"] };
        this.userDisplayed = cliente;
        this.userDisplayed["tipo"] = 'Cliente';
        this.imgPerfil = cliente["fotoPerfil"].trim() === '' ? 'assets/imgs/default-avatar.png': 'data:image/jpeg;base64,' + cliente["fotoPerfil"]
      }
  }

    confirmarAvaliacao(avaliacao: any) {

        this.avaliacaoService.avaliacaoServico(this.servico.id, avaliacao).subscribe(
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
