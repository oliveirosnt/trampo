import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, IonicPage, Events } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { StorageService } from '../../services/storage.service';
import { UsuarioService } from '../../services/usuario.service';
import { DadosUsuarioDTO } from '../../models/dados-usuario.dto';
import {Push, PushObject, PushOptions} from "@ionic-native/push/ngx";

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.html'
})
export class LoginPage {

    creds: CredenciaisDTO = {
        login: "",
        senha: ""
    };

    dadosUsuario: DadosUsuarioDTO;

    constructor(public navCtrl: NavController,
        private alertCtrl: AlertController,
        public loadingCrtl: LoadingController,
        public autenticacao: AutenticacaoService,
        public storage: StorageService,
        public usuario: UsuarioService,
        public events: Events,  private push: Push) {

    }

    cadastroCliente() {
        this.navCtrl.push('CadastroClientePage');
    }

    cadastroFornecedor() {
        this.navCtrl.push('CadastroFornecedorPage');
    }

    redefinicaoSenha() {
        this.navCtrl.push('RedefinicaoSenhaPage');
    }

    login() {
        if (this.creds.login.length < 4) {
            let alert = this.alertCtrl.create({
                title: "Usuário Inválido",
                message: "Por favor, digite um usuário válido",
                buttons: [{
                    text: 'Ok'
                }]
            });
            alert.present();

            return;
        }

        if (this.creds.senha.length < 4) {
            let alert = this.alertCtrl.create({
                title: "Senha Inválida",
                message: "Por favor, digite uma senha válida",
                buttons: [{
                    text: 'Ok'
                }]
            });
            alert.present();

            return;
        }

        this.autenticacao.login(this.creds).subscribe(response => {
            this.autenticacao.successfulLogin(response.body["data"]);
            let loading = this.loadingCrtl.create({
                spinner: 'circles',
                content: 'Entrando',
                duration: 1000
            });
            loading.present();
            this.usuario.getMyUser().subscribe(
                response => {

                    this.dadosUsuario = response['data'];
                    this.events.publish(`user:${this.dadosUsuario.tipo}`)
                    if(this.dadosUsuario.tipo === 'CLIENTE') {
                      this.navCtrl.setRoot('HomeClientePage', this.dadosUsuario);
                    } else {
                      this.navCtrl.setRoot('DashboardPage', this.dadosUsuario);
                    }
                    console.log(`user:${this.dadosUsuario.tipo} published`)
                    this.pushSetup();

                }
            )
        }, error => {
                let alertMessage = this.alertCtrl.create({
                    title: "Problema no Login",
                    message: error.error.message,
                    buttons: [{
                        text: 'Ok'
                    }]
                });
                alertMessage.present();
            });
    }

  pushSetup() {
    const options: PushOptions = {
      android: {
        senderID: '698730155654',
        forceShow: true,
        iconColor:'#0090d0'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      }
    }

    const pushObject: PushObject = this.push.init(options);


    pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', (notification)));

    pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

    pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }
}
