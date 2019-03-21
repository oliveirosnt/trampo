import { Component } from '@angular/core';
import { IonicPage, NavController, Events, NavParams } from 'ionic-angular';

import { LoginPage } from '../login/login';

import { AutenticacaoService } from '../../services/autenticacao.service';
import { StorageService } from '../../services/storage.service';
import { UsuarioService } from '../../services/usuario.service';
import { ServicoClienteService } from '../../services/servico-cliente.service';
import { ServicoFornecedorService } from '../../services/servico-fornecedor.service';

import { ServicoDTO } from '../../models/servico.dto';
import { DadosUsuarioDTO } from '../../models/dados-usuario.dto';

@IonicPage()
@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
})
export class HomePage {

    user: string;
    tipoUsuario: string;
    dados_user: DadosUsuarioDTO = {
        id: null,
        tipo: "",
        fotoPerfil: "",
        nomeCompleto: "",
        login: "",
        email: "",
        avaliacao: null
    };
    servicos: ServicoDTO[];

    constructor(public navCtrl: NavController,
        public autenticacaoService: AutenticacaoService,
        public storageService: StorageService,
        public usuarioService: UsuarioService,
        public events: Events,
        public navParams: NavParams,
        public servicoClienteService: ServicoClienteService,
        public servicoFornecedorService: ServicoFornecedorService) {
    }

    ionViewDidLoad() {
        let localUser = this.storageService.getLocalUser();

        if (localUser && localUser.username) {
            this.user = localUser.username;
        }

        this.usuarioService.getMyUser().subscribe(
            response => {
                this.tipoUsuario = response['data']['tipo'];
                if (this.tipoUsuario == 'CLIENTE') {
                    this.servicoClienteService.getHistorico().subscribe(
                        response => {
                            this.servicos = response.body['data'];
                        });
                } else {
                    this.servicoFornecedorService.getHistorico().subscribe(
                        response => {
                            this.servicos = response.body['data'];
                        });
                }
            }
        );
    }

    logout() {
        this.autenticacaoService.logout();
        this.navCtrl.setRoot(LoginPage);
    }

    openDetalhes(servico: ServicoDTO) {
        this.navCtrl.push('DetalheServicoPage', servico)
    }

    openAddService() {
        this.navCtrl.push('RequisicaoServicoPage');
    }

}