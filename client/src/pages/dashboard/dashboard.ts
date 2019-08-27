import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { StorageService } from '../../services/storage.service';

import { UsuarioService } from '../../services/usuario.service';
import { ServicoFornecedorService } from '../../services/servico-fornecedor.service';

import { ServicoDTO } from '../../models/servico.dto';
import { DadosUsuarioDTO } from '../../models/dados-usuario.dto';
import {LoadingService} from "../../services/loading-service";
import {Observable} from "rxjs";

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})

export class DashboardPage {

  user: DadosUsuarioDTO;
  servicos: ServicoDTO[];
  nomeUsuario: string;

  pieChartData: any;
  lineChartData: any;
  temServicos: boolean;

  loaded: boolean = false;
  totalRecebido: any;
  numServicos: any;
  graficoCarregado: boolean = false;
  periodoEscolhido: string = ' ';
  exibeGraficoExtrato: boolean = false;

  spinnerItem = { icon: 'tail-spin'};

  constructor(
    public navCtrl: NavController,
    public servicoFornecedorService: ServicoFornecedorService,
    public usuarioService: UsuarioService,
    public autenticacaoService: AutenticacaoService,
    public storageService: StorageService,
    private loadingService: LoadingService
  ) {
  }

  ionViewDidLoad() {
    this.load('page-dashboard').subscribe(snapshot => {
      this.spinnerItem = snapshot;
    });

    this.usuarioService.getMyUser().subscribe(
      (response) => {
        this.nomeUsuario = response['data']['nomeCompleto'];
      });

    this.servicoFornecedorService.getHistorico().subscribe( response => {
      const data = response.body['data'];
      if(!data) {
        this.temServicos = false;
        this.loaded = true;
      } else {
        this.carregaServicosBaseadoData('semanal');
      }
    });
  }

  carregaServicosBaseadoData(periodoServico) {
    this.graficoCarregado = false;
    this.periodoEscolhido = periodoServico;
    this.servicoFornecedorService.getHistorico(periodoServico).subscribe(
      response => {
        const data = response.body['data'];
        if(data) {
          this.servicos = response.body['data'];
          let aguardandoRealizacao = 0;
          let concluido = 0;
          this.servicos.map((servico) => {

            if (servico.tipoStatus === 'ACEITO') {
              aguardandoRealizacao += 1;
            } else if (servico.tipoStatus === 'CONCLUIDO') {
              concluido += 1;
            }

          });

          const dataToChart = [['Estado', 'Percent'], ['Aguardando Realização', aguardandoRealizacao], ['Concluído', concluido]];
          this.useAngularLibrary(dataToChart);
        } else {
          this.servicos = [];
        }

        this.servicoFornecedorService.getExtratoPeriodo(periodoServico).subscribe(response => {
          const data = response.body['data'];

          const { total_recebido, servicos, num_servicos } = data;

          this.totalRecebido = total_recebido;
          this.numServicos = num_servicos;

          this.exibeGraficoExtrato = num_servicos > 0;
          if(this.exibeGraficoExtrato) {

            let dateNow = new Date();
            dateNow.setHours(0, 0, 0, 0);
            const previousDate = this.getPreviousDate(periodoServico);
            let dates = this.getDates(previousDate, dateNow);

            servicos.map((servico) => {

              const atualDate = new Date(servico.data);
              atualDate.setHours(0, 0, 0, 0);

              for (let i = 0; i < dates.length; i ++) {
                const arrDate = dates[i];
                const currentDate = arrDate[0];
                if(atualDate.getTime() === currentDate.getTime()) {
                  dates[i][1] = servico.ofertaFinal.valor;
                }
              }

            });

            this.useAngularLibraryLineChart(dates);
          }

          this.temServicos = true;
          this.loaded = true;
          this.graficoCarregado = true;
        });
      });

  };

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
        pieSliceTextStyle: {
          color: '#424242',
        },
        'title': 'Distribuição dos Serviços',
        'colors': ['#0090d0', '#222']
      }
    };
  }

  useAngularLibraryLineChart(data?) {
    const options = {
      hAxis: {
        textPosition: 'none',
        gridlines: {
          count: 10,
        }
      },
      vAxis: {
        gridlines: {
          color: 'transparent',
        },
        textPosition: 'none',
        baselineColor: '#fff',
        gridlineColor: '#fff',
      },
      title: 'Faturamento ao longo do tempo',
      series: {
        0: { color : "#0090d0" }
      },
      width: 400,
      height: 300,
      legend: 'none',
      axes: {
        x: {
          0: { side: 'top'}
        }
      },
      smoothLine: true
    };

    this.lineChartData = {
      chartType: 'LineChart',
      dataTable: [['Tempo', 'Faturamento (R$)'], ...data],
      options: options,

    };
  }

  openServicosDisponiveis() {
    this.navCtrl.setRoot('ListagemServicoPage');
  }

  load(item: any): Observable<any> {
    var that = this;
    that.loadingService.show();
    return new Observable(observer => {
      that.loadingService.hide();
      observer.next({"icon": "tail-spin"});
      observer.complete();
    });
  };

  formataDinheiro() {
    const dinheiro = this.totalRecebido.toString().split('.');
    if(dinheiro[1] === undefined) {
      dinheiro[1] = '00';
    }
    return dinheiro[0] + ',' + dinheiro[1];
  }

  getDias() {
    if(this.periodoEscolhido[0] === 's'){
      return '7'
    } else if (this.periodoEscolhido[0] == 'm') {
      return '30'
    } else if (this.periodoEscolhido[0] === 'a') {
      return '365'
    } else {
      return 'indeterminados'
    }
  }

  getDates(startDate: Date, stopDate: Date) {
    const dateArray = [];
    let currentDate = startDate;
    while (currentDate <= stopDate) {
      dateArray.push([new Date(currentDate.getTime()), 0]);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dateArray;
  }

  getPreviousDate(periodo) {
    let resp = 1;
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    if(periodo[0] == 's') {
      resp = 7;
    } else if (periodo[0] == 'm') {
      resp = 30;
    } else if (periodo[0] == 'a') {
      resp =  365;
    }

    date.setDate(date.getDate() - resp)
    return date;
  }
}
