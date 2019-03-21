import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { ServicoDTO } from '../../models/servico.dto';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { StorageService } from '../../services/storage.service';
import { ServicoClienteService } from '../../services/servico-cliente.service';
import { ServicoFornecedorService } from '../../services/servico-fornecedor.service';
import { UsuarioService } from '../../services/usuario.service';
import { DadosUsuarioDTO } from '../../models/dados-usuario.dto';



@IonicPage()
@Component({
    selector: 'page-listagem',
    templateUrl: 'listagem-servico-aceitos.html',
})
export class ListagemServicoAceitosPage {
    user: DadosUsuarioDTO;
    servicos: ServicoDTO[];


    constructor(public navCtrl: NavController,
        public autenticacaoService: AutenticacaoService,
        public storageService: StorageService,
        public servicoClienteService: ServicoClienteService,
        public servicoFornecedorService: ServicoFornecedorService,
        public usuarioService: UsuarioService,
        public alertCtrl: AlertController) {

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
