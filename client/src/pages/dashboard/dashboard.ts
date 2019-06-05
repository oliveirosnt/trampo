import { Component } from '@angular/core';
//import { IonicPage, NavController} from 'ionic-angular';

import { UsuarioService } from '../../services/usuario.service';
import { ServicoFornecedorService } from '../../services/servico-fornecedor.service';

import { ServicoDTO } from '../../models/servico.dto';
import { DadosUsuarioDTO } from '../../models/dados-usuario.dto';

import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { StorageService } from '../../services/storage.service';
import { ServicoClienteService } from '../../services/servico-cliente.service';


@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

	user: DadosUsuarioDTO;
    servicos: ServicoDTO[];

  	constructor(
  		public navCtrl: NavController, 
        public servicoFornecedorService: ServicoFornecedorService,
        public usuarioService: UsuarioService,

        public autenticacaoService: AutenticacaoService,
        public storageService: StorageService,
        public servicoClienteService: ServicoClienteService,
        public alertCtrl: AlertController
        ) {
  	}

    ionViewDidLoad() {
        this.usuarioService.getMyUser().subscribe(
            response => {
                this.servicoFornecedorService.getServicosAceitos().subscribe(
                    response => {
                        this.servicos = response.body['data'];
                    });
            }
        );

    }

    ionBackPage() {
        this.navCtrl.setRoot('HomePage');
    }

    openDetalhes(servico: ServicoDTO) {
        this.navCtrl.push('DetalheServicoPage', servico)
    }

}
