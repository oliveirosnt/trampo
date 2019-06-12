import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { Environment } from '@ionic-native/google-maps';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { StorageService } from '../../services/storage.service';
import { EspecialidadesService } from '../../services/especialidades.service';
import { ServicoDTO } from '../../models/servico.dto';
import { ServicoClienteService } from '../../services/servico-cliente.service';
import { UsuarioService } from '../../services/usuario.service';

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

    dados_servico: ServicoDTO = {
        id: null,
        descricao: "",
        data: "",
        horario: "",
        tipo: "",
        endereco: {
            nome: "",
            location : null,
            pontoReferencia: ""
        },
        isAvaliadoCliente: null,
        isAvaliadoFornecedor: null
    }

    constructor(public navCtrl: NavController,
        public autenticacaoService: AutenticacaoService,
        public storageService: StorageService,
        public especialidadesService: EspecialidadesService,
        public cadastroServService: ServicoClienteService,
        public alertCtrl: AlertController,
        public usuarioService: UsuarioService) {
        this.getEspecialidades();
        this.minData = new Date().toISOString();
        this.maxData = (new Date().getFullYear()) + 2; // O "2" representa anos posteriores
    }

    ionViewDidLoad() {
        let localUser = this.storageService.getLocalUser();
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
            location : null,
            pontoReferencia: ""
          },
          isAvaliadoCliente: null,
          isAvaliadoFornecedor: null
        };

        this.loadMap();
    }

    ionBackPage() {
        this.navCtrl.setRoot('HomePage');
    }

    getEspecialidades() {
        this.especialidadesService.getEspecialidades().subscribe(response => {
            for (var key in response.body) {
                this.especialidades.push(response.body[key]['nome']);
            }
        });
    }

    cadastrar(servico: ServicoDTO) {
        this.cadastroServService.cadastraServicoCliente(servico).subscribe(
            response => {
                let alertMessage = this.alertCtrl.create({
                    message: response.body['message'],
                    buttons: [{
                        text: 'Ok'
                    }]
                });
                alertMessage.present();
                this.navCtrl.setRoot('HomePage');
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

        // This code is necessary for browser
        Environment.setEnv({
          'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBTyczdC5fDO-MkSilkJynkL8IXrN6HDIk',
          'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBTyczdC5fDO-MkSilkJynkL8IXrN6HDIk'
        });

        this.map = new google.maps.Map(document.getElementById('map_canvas'), {
            center: {lat: -7.229075, lng: -35.880834},
            zoom: 12,
            disableDefaultUI: false,
            streetViewControl: false,
            mapTypeControl: false
          });

        var input = document.getElementById('loc-input').getElementsByTagName('input')[0];

        var autocomplete =  new google.maps.places.Autocomplete(
            input, {
                types: ['address'],
                fields:  ['address_components', 'geometry', 'icon', 'name'],
            });


        autocomplete.bindTo('bounds', this.map);

        var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
        var marker = new google.maps.Marker();
        marker.setMap(this.map);
        marker.setTitle('Local do Serviço');
        let geocoder = new google.maps.Geocoder;

        marker.addListener('click', function() {
          this.map.setZoom(17);
          this.map.setCenter(marker.getPosition());
        });

      marker.addListener('dragend', (event) => {
          marker.setPosition(event.latLng);
          marker.setVisible(true);
          marker.setDraggable(true);
          geocoder.geocode({'location': event.latLng}, (results, status) => {
            let inputs = [];
            inputs.push(document.querySelector('#loc-input > input'));
            inputs[0].value = results[0].formatted_address;
            const endereco: any = {
              nome: results[0].formatted_address,
              location: {
                lat: parseFloat(JSON.stringify(event.latLng.lat())),
                lng: parseFloat(JSON.stringify(event.latLng.lng()))
              },
            };

            this.dados_servico.endereco = endereco;
          });
          this.map.setZoom(17);
          this.map.setCenter(marker.getPosition());
      });


      this.map.addListener('click', (event) => {
            marker.setPosition(event.latLng);
            marker.setVisible(true);
            marker.setDraggable(true);
            geocoder.geocode({'location': event.latLng}, (results, status) => {
              let inputs = [];
              inputs.push(document.querySelector('#loc-input > input'));
              inputs[0].value = results[0].formatted_address;
              const endereco: any = {
                nome: results[0].formatted_address,
                location: {
                  lat: parseFloat(JSON.stringify(event.latLng.lat())),
                  lng: parseFloat(JSON.stringify(event.latLng.lng()))
                },
              };

              this.dados_servico.endereco = endereco;
            });
            this.map.setZoom(17);
            this.map.setCenter(marker.getPosition());
        });

        autocomplete.addListener('place_changed', () => {
            infowindow.close();
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                let alertMessage = this.alertCtrl.create({
                    title: "Endereço Inválido",
                    message: "Digite um Endereço válido",
                    buttons: [{
                        text: 'Ok'
                    }]
                });
                alertMessage.present();
              return;
            }

            if (!place.geometry.viewport) {
                this.map.setCenter(place.geometry.location);
                this.map.setZoom(17);  // Why 17? Because it looks good.
            }


            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
            marker.setDraggable(true);

            var address = '';
            if (place.address_components) {
              address = [
                (place.address_components[0] && place.address_components[0].short_name || ''),
                (place.address_components[1] && place.address_components[1].short_name || ''),
                (place.address_components[2] && place.address_components[2].short_name || '')
              ].join(' ');
            }

            infowindowContent.children['place-icon'].src = place.icon;
            infowindowContent.children['place-name'].textContent = place.name;
            infowindowContent.children['place-address'].textContent = address;
            infowindow.open(this.map, marker);

            const endereco: any = {
                nome: "",
                location: null,
            }
            endereco.location = place.geometry.location.toJSON();
            endereco.nome = address;
            this.dados_servico.endereco = endereco;
          });
        }
}
