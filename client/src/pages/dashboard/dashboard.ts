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



function getWeeksInMonth(thisDay, month, year){
   var weeks=[],
       firstDate=new Date(year, month, 1),
       lastDate=new Date(year, month+1, 0), 
       numDays= lastDate.getDate();
   
   var start=1;
   var end=7-firstDate.getDay();
   while(start<=numDays){
       weeks.push({start:start,end:end});
       start = end + 1;
       end = end + 7;
       if(end>numDays)
           end=numDays;    
   }
   var weekNumber = -1;
   var day;
   for (var i=0; i<weeks.length; i++) {
     weekNumber = i+1;
     if (weeks[i].start <= thisDay && thisDay <= weeks[i].end){
         weekNumber+=1;
         return weekNumber;
     }
   }
    return weekNumber; // (== -1) -> ERROR
} 


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

    semanal(){
      this.usuarioService.getMyUser().subscribe(
        response => {
                this.servicoFornecedorService.getHistorico().subscribe(
                    response => {
                        this.servicos = response.body['data'];
                        let aguardandoRealizacao = 0;
                        let concluido = 0;

                        this.servicos.map((servico) => {
              
              var date =  new Date();
              var y = getWeeksInMonth(date.getDay(), date.getMonth(), date.getFullYear());
              
              //var mesAtual = data.substr(5, 2);
              //var mesServico = servico.data.substr(5, 2);


                let alertMessage = this.alertCtrl.create({
                    message: "Date AAAA: "+y,
                    buttons: [{
                        text: 'Ok'
                    }]
                });
                alertMessage.present();


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


    mensal() {
      this.usuarioService.getMyUser().subscribe(
        response => {
                this.servicoFornecedorService.getHistorico().subscribe(
                    response => {
                        this.servicos = response.body['data'];
                        let aguardandoRealizacao = 0;
                        let concluido = 0;

                        this.servicos.map((servico) => {
              var data =  new Date().toISOString();
              var mesAtual = data.substr(5, 2);
              var mesServico = servico.data.substr(5, 2);

/*
                let alertMessage = this.alertCtrl.create({
                    message: "Date AAAA: "+res,
                    buttons: [{
                        text: 'Ok'
                    }]
                });
                alertMessage.present();
*/

                          if(servico.tipoStatus === 'ACEITO' && mesServico == mesAtual) {
                            aguardandoRealizacao += 1;
                          } else if(servico.tipoStatus === 'CONCLUIDO' && mesServico == mesAtual) {
                            concluido += 1;
                          }
                        });


                        const dataToChart = [['Estado', 'Percent'], ['Aguardando Realização', aguardandoRealizacao], ['Concluído', concluido]];
                        this.useAngularLibrary(dataToChart);
                    });
            }
        );
    }

    anual() {
      this.usuarioService.getMyUser().subscribe(
        response => {
                this.servicoFornecedorService.getHistorico().subscribe(
                    response => {
                        this.servicos = response.body['data'];
                        let aguardandoRealizacao = 0;
                        let concluido = 0;

                        this.servicos.map((servico) => {
              var data =  new Date().toISOString();
              var anoAtual = data.substr(0, 4);
              var anoServico = servico.data.substr(0, 4);

                          if(servico.tipoStatus === 'ACEITO' && anoServico == anoAtual) {
                            aguardandoRealizacao += 1;
                          } else if(servico.tipoStatus === 'CONCLUIDO' && anoServico == anoAtual) {
                            concluido += 1;
                          }
                        });


                        const dataToChart = [['Estado', 'Percent'], ['Aguardando Realização', aguardandoRealizacao], ['Concluído', concluido]];
                        this.useAngularLibrary(dataToChart);
                    });
            }
        );
    }

    ionBackPage() {
        this.navCtrl.setRoot('HomePage');
    }

    openDetalhes(servico: ServicoDTO) {
        this.navCtrl.push('DetalheServicoPage', {servico: servico, ofertas: servico.ofertasRecebidas})
    }

}
