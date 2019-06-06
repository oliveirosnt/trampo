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
	pieChartData: any;

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
                this.servicoFornecedorService.getHistorico().subscribe(
                    response => {
                        this.servicos = response.body['data'];
                        let aguardandoRealizacao = 0;
                        let concluido = 0;

                        this.servicos.map((servico) => {
                          if(servico.tipoStatus === 'ACEITO') {
                            aguardandoRealizacao += 1;
                          } else if(servico.tipoStatus === 'CONCLUIDO') {
                            concluido += 1;
                          }
                        });


                        const dataToChart = [['Estado', 'Percent'], ['Aguardando Realização', aguardandoRealizacao], ['Concluído', concluido]];
                        this.useAngularLibrary(dataToChart);
                    });
            }
        );

    }

    useAngularLibrary(data) {
      this.pieChartData = {
        chartType: 'PieChart',
        dataTable: data,
        options: {
          'width': 400,
          'height': 300,
          'pieHole': 0.65,
          'title': 'Distribuição dos Serviços',
          'colors': ['#ffd700', '#3fdc54']
        }
      };
    }

    ionBackPage() {
        this.navCtrl.setRoot('HomePage');
    }

    openDetalhes(servico: ServicoDTO) {
        this.navCtrl.push('DetalheServicoPage', {servico: servico, ofertas: servico.ofertasRecebidas})
    }

}
