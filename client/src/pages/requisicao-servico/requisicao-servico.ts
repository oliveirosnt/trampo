import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams } from 'ionic-angular';
import { Environment } from '@ionic-native/google-maps';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { StorageService } from '../../services/storage.service';
import { EspecialidadesService } from '../../services/especialidades.service';
import { ServicoDTO } from '../../models/servico.dto';
import { ServicoClienteService } from '../../services/servico-cliente.service';
import { UsuarioService } from '../../services/usuario.service';
import {ImageModel} from "../../models/image.model";
import {FileService} from "../../services/file.service";

declare var google;

@IonicPage()
@Component({
    selector: 'page-requisicao',
    templateUrl: 'requisicao-servico.html',
})
export class RequisicaoServicoPage {

    minData = null;
    maxData = null;
    user: string;
    especialidades: string[] = [];
    map: any;
    geocoder = new google.maps.Geocoder;
    placeId: string;
    image: ImageModel = {
      hasPhoto: false,
      preview: '',
      currentFiles: [],
      type: 'singleFile',
      style: 'list-servico',
      identifications: []
    };

    dados_servico: ServicoDTO = {
        id: null,
        descricao: "",
        data: "",
        horario: "",
        tipo: "",
        endereco: {
            nome: "",
            location: null,
            pontoReferencia: ""
        },
        isAvaliadoCliente: null,
        isAvaliadoFornecedor: null,
        anexos: []
    }

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        public autenticacaoService: AutenticacaoService,
        public storageService: StorageService,
        public especialidadesService: EspecialidadesService,
        public cadastroServService: ServicoClienteService,
        public alertCtrl: AlertController,
        public usuarioService: UsuarioService,
                private fileService: FileService) {
        this.getEspecialidades();
        this.minData = new Date().toISOString();
        this.maxData = (new Date().getFullYear()) + 2; // O "2" representa anos posteriores
    }

    ionViewDidLoad() {
        let localUser = this.storageService.getLocalUser();

        this.placeId = this.navParams.get('placeId');

        if (localUser && localUser.username) {
            this.user = localUser.username.split(" ")[0];
        }

        this.dados_servico = {
            id: null,
            descricao: "",
            data: "",
            horario: "",
            tipo: "",
            endereco: {
                nome: "",
                location: null,
                pontoReferencia: ""
            },
            isAvaliadoCliente: null,
            isAvaliadoFornecedor: null
        };

        this.loadMap();
    }

    ionBackPage() {
        this.navCtrl.setRoot('HomeClientePage');
    }

    getEspecialidades() {
        this.especialidadesService.getEspecialidades().subscribe(response => {
            for (var key in response.body) {
                this.especialidades.push(response.body[key]['nome']);
            }
        });
    }

    cadastrar(servico) {
      if(this.image.hasPhoto) {
        this.fileService.generateIdentifications(this.image);
        servico.anexos = this.image.identifications;
      } else {
        servico.anexos = [];
      }
      this.cadastroServService.cadastraServicoCliente(servico).subscribe(
          response => {
            if(this.image.hasPhoto) {
              this.fileService.startUpload(this.image, () => {
                let alertMessage = this.alertCtrl.create({
                  message: response.body['message'],
                  buttons: [{
                    text: 'Ok'
                  }]
                });
                alertMessage.present();
                this.navCtrl.setRoot('HomeClientePage');
              })

            } else {
              let alertMessage = this.alertCtrl.create({
                message: response.body['message'],
                buttons: [{
                  text: 'Ok'
                }]
              });
              alertMessage.present();
              this.navCtrl.setRoot('HomeClientePage');
            }

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

    isEnabled() {
        return (this.dados_servico.data && this.dados_servico.horario && this.dados_servico.tipo
            && this.dados_servico.endereco.nome && this.dados_servico.endereco.location && this.dados_servico.endereco.pontoReferencia)
    }

    loadMap() {
        Environment.setEnv({
            'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBTyczdC5fDO-MkSilkJynkL8IXrN6HDIk',
            'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBTyczdC5fDO-MkSilkJynkL8IXrN6HDIk'
        });

        this.map = new google.maps.Map(document.getElementById('map_canvas'), {
            zoom: 17,
            disableDefaultUI: false,
            streetViewControl: false,
            mapTypeControl: false
        });

        this.geocoder.geocode({ 'placeId': this.placeId }, (results) => {
            if (results[0]) {
                let marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: this.map,
                });

                this.dados_servico.endereco.nome = results[0].formatted_address;
                this.dados_servico.endereco.location = results[0].geometry.location.toJSON();

                this.map.setCenter(results[0].geometry.location);
            }

        });
    }

  chamaPageImage() {
    this.navCtrl.push("ImagePage", {image: this.image});
  }

  pingImage() {
      console.log(this.image);
  }
}
