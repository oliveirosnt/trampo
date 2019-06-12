import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Environment } from '@ionic-native/google-maps';

@IonicPage()
@Component({
    selector: 'page-home-cliente',
    templateUrl: 'home-cliente.html',
})
export class HomeClientePage {

    heightMap = 75;

    startPosition: any;
    map: any;
    directionsDisplay = new google.maps.DirectionsRenderer();

    GoogleAutocomplete = new google.maps.places.AutocompleteService();
    autocomplete = { input: '', placeId: '' };
    autocompleteItems = [];
    geocoder = new google.maps.Geocoder;
    markers = [];

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private geolocation: Geolocation) {
    }

    ionViewDidLoad() {
        this.initializeMap();
    }

    initializeMap() {
        Environment.setEnv({
            'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyBTyczdC5fDO-MkSilkJynkL8IXrN6HDIk',
            'API_KEY_FOR_BROWSER_DEBUG': 'AIzaSyBTyczdC5fDO-MkSilkJynkL8IXrN6HDIk'
        });

        this.geolocation.getCurrentPosition()
            .then((resp) => {
                const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

                this.geocoder.geocode({ 'location': position }, (results, status) => {
                    if (results[0]) {
                        this.autocomplete.input = results[0].formatted_address;
                        this.autocomplete.placeId = results[0].place_id;
                    }
                });

                const mapOptions = {
                    zoom: 14,
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
                console.log('Erro ao recuperar sua posição', error);
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

    nextServiceRequest() {
        this.navCtrl.push('RequisicaoServicoPage', { placeId: this.autocomplete.placeId });
    }
}
