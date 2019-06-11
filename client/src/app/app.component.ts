import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AutenticacaoService } from '../services/autenticacao.service';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    @ViewChild(Nav) nav: Nav;
    rootPage: string = 'LoginPage';
    pages: Array<any>;

    constructor(platform: Platform,
        statusBar: StatusBar,
        splashScreen: SplashScreen,
        events: Events,
        public autenticacaoService: AutenticacaoService) {

        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
        });

        events.subscribe('user:CLIENTE', () => {
            this.pages = [
                { title: 'Home', component: 'HomePage', icon: { android: 'md-home', ios: 'ios-home' } },
                { title: 'Listagem de Serviço', component: 'ListagemServicoPage', icon: { android: 'md-list', ios: 'ios-list' } },
                { title: 'Perfil', component: 'PerfilPage', icon: { android: 'md-contact', ios: 'ios-contact' } }
            ];
        });

        events.subscribe('user:FORNECEDOR', () => {
            this.pages = [
                { title: 'Home', component: 'DashboardPage', icon: { android: 'md-home', ios: 'ios-home' } },
                { title: 'Serviços Disponíveis', component: 'ListagemServicoPage', icon: { android: 'md-construct', ios: 'ios-construct' } },
                { title: 'Meus Serviços', component: 'ListagemServicoAceitosPage', icon: { android: 'md-folder', ios: 'ios-folder' } },
                { title: 'Perfil', component: 'PerfilPage', icon: { android: 'md-contact', ios: 'ios-contact' } }
            ];
        });
    }

    openPage(page) {
        this.nav.setRoot(page.component);
    }

    logout() {
        this.autenticacaoService.logout();
        this.nav.setRoot('LoginPage');
    }
}

