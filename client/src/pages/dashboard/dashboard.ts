import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { StorageService } from '../../services/storage.service';

import { UsuarioService } from '../../services/usuario.service';
import { ServicoFornecedorService } from '../../services/servico-fornecedor.service';

import { ServicoDTO } from '../../models/servico.dto';
import { DadosUsuarioDTO } from '../../models/dados-usuario.dto';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})

export class DashboardPage {

	user: DadosUsuarioDTO;
	servicos: ServicoDTO[];

  isSemanal: boolean;
  isMensal: boolean;
  isAnual: boolean;
  chartIsNotNull: boolean;
	pieChartData: any;

  constructor(
  	public navCtrl: NavController,
    public servicoFornecedorService: ServicoFornecedorService,
    public usuarioService: UsuarioService,
    public autenticacaoService: AutenticacaoService,
    public storageService: StorageService
  ) {}

  ionViewDidLoad() {
    this.semanal();
  }

  openDetalhes(servico: ServicoDTO) {
    this.navCtrl.push('DetalheServicoPage', {servico: servico, ofertas: servico.ofertasRecebidas})
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
  
  mostraServico(servico){
    var date =  new Date().toISOString();
    var anoAtual = date.substr(0, 4);
    var mesAtual = date.substr(5, 2);
    var diaAtual = date.substr(8, 2);
    var anoServico = servico.data.substr(0, 4);
    var mesServico = servico.data.substr(5, 2);
    var diaServico = servico.data.substr(8, 2);
    var numeroSemanaAtual = getWeeksInMonth(diaAtual, mesAtual, anoAtual);

    if(this.isSemanal) {
      var numeroSemanaServico = getWeeksInMonth(diaServico, mesServico, anoServico);
      if(numeroSemanaAtual==numeroSemanaServico) {
        return true;
      }

    } else if(this.isMensal) {    
      if(mesServico == mesAtual) {
        return true;
      }

    } else {
      if(anoServico == anoAtual) {
        return true;
      } 

    }
    return false;
  }

  semanal() {
    this.isSemanal=true;
    this.isMensal=false;
    this.isAnual=false;

    this.usuarioService.getMyUser().subscribe(
      response => {
        this.servicoFornecedorService.getHistorico().subscribe(
          response => {
            this.servicos = response.body['data'];
            let aguardandoRealizacao = 0;
            let concluido = 0;

            this.servicos.map((servico) => {
              var date =  new Date().toISOString();
              var anoAtual = date.substr(0, 4);
              var mesAtual = date.substr(5, 2);
              var diaAtual = date.substr(8, 2);
              var anoServico = servico.data.substr(0, 4);
              var mesServico = servico.data.substr(5, 2);
              var diaServico = servico.data.substr(8, 2);
              var numeroSemanaAtual = getWeeksInMonth(diaAtual, mesAtual, anoAtual);
              var numeroSemanaServico = getWeeksInMonth(diaServico, mesServico, anoServico);

              if(servico.tipoStatus === 'ACEITO' && numeroSemanaAtual == numeroSemanaServico) {
                aguardandoRealizacao += 1;
              } else if(servico.tipoStatus === 'CONCLUIDO' && numeroSemanaAtual == numeroSemanaServico) {
                concluido += 1;
              }

            });

            this.checkDateService(aguardandoRealizacao, concluido);
            const dataToChart = [['Estado', 'Percent'], ['Aguardando Realização', aguardandoRealizacao], ['Concluído', concluido]];
            this.useAngularLibrary(dataToChart);
          });
      }
    );

  }

  mensal() {
    this.isSemanal=false;
    this.isMensal=true;
    this.isAnual=false;

    this.usuarioService.getMyUser().subscribe(
      response => {
        this.servicoFornecedorService.getHistorico().subscribe(
          response => {
            this.servicos = response.body['data'];
            let aguardandoRealizacao = 0;
            let concluido = 0;

            this.servicos.map((servico) => {
              var date =  new Date().toISOString();
              var mesAtual = date.substr(5, 2);
              var mesServico = servico.data.substr(5, 2);

              if(servico.tipoStatus === 'ACEITO' && mesServico == mesAtual) {
                aguardandoRealizacao += 1;
              } else if(servico.tipoStatus === 'CONCLUIDO' && mesServico == mesAtual) {
                concluido += 1;
              }

            });

            this.checkDateService(aguardandoRealizacao, concluido);
            const dataToChart = [['Estado', 'Percent'], ['Aguardando Realização', aguardandoRealizacao], ['Concluído', concluido]];
            this.useAngularLibrary(dataToChart);
          });
      }
    );

  }

  anual() {
    this.isSemanal=false;
    this.isMensal=false;
    this.isAnual=true;

    this.usuarioService.getMyUser().subscribe(
      response => {
        this.servicoFornecedorService.getHistorico().subscribe(
          response => {
            this.servicos = response.body['data'];
            let aguardandoRealizacao = 0;
            let concluido = 0;

            this.servicos.map((servico) => {
              var date =  new Date().toISOString();
              var anoAtual = date.substr(0, 4);
              var anoServico = servico.data.substr(0, 4);

              if(servico.tipoStatus === 'ACEITO' && anoServico == anoAtual) {
                aguardandoRealizacao += 1;
              } else if(servico.tipoStatus === 'CONCLUIDO' && anoServico == anoAtual) {
                concluido += 1;
              }

            });

            this.checkDateService(aguardandoRealizacao, concluido);
            const dataToChart = [['Estado', 'Percent'], ['Aguardando Realização', aguardandoRealizacao], ['Concluído', concluido]];
            this.useAngularLibrary(dataToChart);
          });
      }
    );

  }

    checkDateService(aguardandoRealizacao, concluido){
      if(aguardandoRealizacao==0 && concluido==0) {
        this.chartIsNotNull = false;
      } else {
        this.chartIsNotNull = true;
      }
    }

}

function getWeeksInMonth(thisDay, month, year){
  var weeks = [],
      firstDate = new Date(year, month, 1),
      lastDate = new Date(year, month+1, 0),
      numDays = lastDate.getDate();
  var start = 1;
  var end = 7 - firstDate.getDay();
  var weekNumber = -1;

  while(start <= numDays){
    weeks.push({start:start,end:end});
    start = end + 1;
    end = end + 7;
    if(end > numDays)
      end = numDays;    
  }

  for (var i=0; i<weeks.length; i++) {
    weekNumber = i + 1;
    if (weeks[i].start <= thisDay && thisDay <= weeks[i].end){
      weekNumber+=1;
      return weekNumber;
    }
  }
  return weekNumber; // (== -1) -> ERROR
} 