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
    pages: Array<{ title: string, component: string }>;

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
                { title: 'Home', component: 'HomeClientePage' },
                { title: 'Listagem de Serviço', component: 'ListagemServicoPage' },
                { title: 'Perfil', component: 'PerfilPage' }
            ];
        });

        events.subscribe('user:FORNECEDOR', () => {
            this.pages = [
                { title: 'Home', component: 'HomePage' },
                { title: 'Serviços Disponíveis', component: 'ListagemServicoPage' },
                { title: 'Meus Serviços', component: 'ListagemServicoAceitosPage' },
                { title: 'Perfil', component: 'PerfilPage' }
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

