import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Environment } from '@ionic-native/google-maps';
import {Observable} from "rxjs";
import {LoadingService} from "../../services/loading-service";

declare var google;
@IonicPage()
@Component({
    selector: 'page-home-cliente',
    templateUrl: 'home-cliente.html',
})
export class HomeClientePage {

    heightMap = 75;
    hasLocation: boolean = undefined;

    spinnerItem = { icon: 'tail-spin'};

    startPosition: any;
    map: any;
    directionsDisplay = new google.maps.DirectionsRenderer();

    GoogleAutocomplete = new google.maps.places.AutocompleteService();
    autocomplete = { input: '', placeId: '' };
    autocompleteItems = [];
    geocoder = new google.maps.Geocoder;
    markers = [];
    position: any;
    autocompleteWithoutLocation: any = { input: '' };
    loaded: boolean = false;

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private geolocation: Geolocation,
                public alertCtrl: AlertController, private loadingService: LoadingService) {
    }

    ionViewDidLoad() {
      this.load('page-home-cliente').subscribe(snapshot => {
        this.spinnerItem = snapshot;
      });

      this.initializeMap();
    }

    initializeMap() {
        Environment.setEnv({
            'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBTyczdC5fDO-MkSilkJynkL8IXrN6HDIk',
            'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBTyczdC5fDO-MkSilkJynkL8IXrN6HDIk'
        });

        this.geolocation.getCurrentPosition({ timeout: 5000, enableHighAccuracy: true })
            .then((resp) => {
                this.loaded = true;
                this.hasLocation = true;

                const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

                this.geocoder.geocode({ 'location': position }, (results, status) => {
                    if (results[0]) {
                        this.autocomplete.input = results[0].formatted_address;
                        this.autocomplete.placeId = results[0].place_id;
                    }
                });

                const mapOptions = {
                    zoom: 17,
                    center: position,
                    zoomControl: true,
                    mapTypeControl: false,
                    streetViewControl: false,
                    fullscreenControl: false
                }

                this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

                let marker = new google.maps.Marker({
                    position: position,
                    map: this.map
                });

                this.markers.push(marker);

            }).catch((error) => {
                this.hasLocation = false;
                this.loaded = true;
                this.loadMap();
            });
    }

    changeLocation() {
        this.heightMap = 50;

        if (!this.autocomplete.input.trim().length) {
            this.autocompleteItems = [];
            return;
        }

        this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
            (predictions) => {
                if (predictions && predictions.length) {
                    this.autocompleteItems = [];
                    predictions.forEach((prediction) => {
                        this.autocompleteItems.push(prediction);
                    });
                }
            });
    }

    selectSearchResult(item) {
        this.heightMap = 75;

        this.clearMarkers();
        this.autocompleteItems = [];

        this.geocoder.geocode({ 'placeId': item.place_id }, (results, status) => {
            if (results[0]) {
                this.autocomplete.input = results[0].formatted_address;
                this.autocomplete.placeId = results[0].place_id;

                let marker = new google.maps.Marker({
                    position: results[0].geometry.location,
                    map: this.map,
                });

                this.markers.push(marker);
                this.map.setCenter(results[0].geometry.location);
            }
        });
    }

    clearMarkers() {
        for (var i = 0; i < this.markers.length; i++) {
            console.log(this.markers[i])
            this.markers[i].setMap(null);
        }

        this.markers = [];
    }

  loadMap() {

    // This code is necessary for browser
    Environment.setEnv({
      'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBTyczdC5fDO-MkSilkJynkL8IXrN6HDIk',
      'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBTyczdC5fDO-MkSilkJynkL8IXrN6HDIk'
    });
    this.position = new google.maps.LatLng(-7.229075, -35.880834);
    this.map = new google.maps.Map(document.getElementById('map_canvas_client'), {
      center: {lat: -7.229075, lng: -35.880834},
      zoom: 12,
      disableDefaultUI: false,
      streetViewControl: false,
      mapTypeControl: false
    });

    var input = document.getElementById('loc-input').getElementsByTagName('input')[0];

    this.autocompleteWithoutLocation =  new google.maps.places.Autocomplete(
      input, {
        types: ['address'],
        fields:  ['address_components', 'geometry', 'icon', 'name'],
      });


    this.autocompleteWithoutLocation.bindTo('bounds', this.map);

    var infowindow = new google.maps.InfoWindow();
    var infowindowContent = document.getElementById('infowindow-content');
    infowindow.setContent(infowindowContent);
    var marker = new google.maps.Marker();
    marker.setMap(this.map);
    marker.setTitle('Local do Serviço');
    let geocoder = new google.maps.Geocoder;

    marker.addListener('click', function(event) {
      this.map.setZoom(17);
      this.map.setCenter(marker.getPosition());
      this.position = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
    });

    marker.addListener('dragend', (event) => {
      marker.setPosition(event.latLng);
      marker.setVisible(true);
      marker.setDraggable(true);
      geocoder.geocode({'location': event.latLng}, (results, status) => {
        let inputs = [];
        inputs.push(document.querySelector('#loc-input > input'));
        inputs[0].value = results[0].formatted_address;
        this.position = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
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
        this.position = new google.maps.LatLng(event.latLng.lat(), event.latLng.lng());
      });
      this.map.setZoom(17);
      this.map.setCenter(marker.getPosition());
    });

    this.autocompleteWithoutLocation.addListener('place_changed', () => {
      infowindow.close();
      marker.setVisible(false);
      console.log('chamou esse');
      var place = this.autocompleteWithoutLocation.getPlace();
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
      marker.setPosition(place.geometry.location);
      marker.setVisible(true);
      marker.setDraggable(true);

      this.map.setZoom(17);
      this.map.setCenter(marker.getPosition());

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

      this.position = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng());
    });
  }

    nextServiceRequest() {
        if(this.hasLocation) {
          this.navCtrl.push('RequisicaoServicoPage', { placeId: this.autocomplete.placeId });
        } else {
          this.geocoder.geocode({ 'location': this.position }, (results) => {
            if (results[0]) {
              this.navCtrl.push('RequisicaoServicoPage', { placeId: results[0].place_id });
            } else {
              let alertMessage = this.alertCtrl.create({
                title: "Endereço Inválido",
                message: "Digite um Endereço válido",
                buttons: [{
                  text: 'Ok'
                }]
              });
              alertMessage.present();
            }

          });
        }
    }

    validPosition() {
      return this.position !== undefined && this.position.lat() !== -7.229075 && this.position.lng() !== -35.880834;
    }

  load(item: any): Observable<any> {
    var that = this;
    that.loadingService.show();
    return new Observable(observer => {
      that.loadingService.hide();
      observer.next({"icon": "tail-spin"});
      observer.complete();
    });
  };
}
