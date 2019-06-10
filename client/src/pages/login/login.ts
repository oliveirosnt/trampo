import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, IonicPage, Events } from 'ionic-angular';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { StorageService } from '../../services/storage.service';
import { UsuarioService } from '../../services/usuario.service';
import { DadosUsuarioDTO } from '../../models/dados-usuario.dto';

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
        public events: Events) {

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
                    this.events.publish(`user:${this.dadosUsuario.tipo}`);

                    if (this.dadosUsuario.tipo && this.dadosUsuario.tipo == 'CLIENTE') {
                        this.navCtrl.setRoot('HomeClientePage', this.dadosUsuario);
                    } else {
                        this.navCtrl.setRoot('HomePage', this.dadosUsuario);
                    }
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
}
