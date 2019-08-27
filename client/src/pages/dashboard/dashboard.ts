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
  nomeUsuario: string;

  pieChartData: any;
  temServicos: boolean;

  constructor(
    public navCtrl: NavController,
    public servicoFornecedorService: ServicoFornecedorService,
    public usuarioService: UsuarioService,
    public autenticacaoService: AutenticacaoService,
    public storageService: StorageService
  ) {
  }

  ionViewDidLoad() {
    this.usuarioService.getMyUser().subscribe(
      (response) => {
        this.nomeUsuario = response['data']['nomeCompleto'];
      });
    this.carregaServicosBaseadoData(null);
  }

  carregaServicosBaseadoData(periodoServico) {

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
          this.temServicos = true;
          const dataToChart = [['Estado', 'Percent'], ['Aguardando Realização', aguardandoRealizacao], ['Concluído', concluido]];
          this.useAngularLibrary(dataToChart);
        } else {
          this.temServicos = false;
          this.servicos = [];
        }

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

  openServicosDisponiveis() {
    this.navCtrl.setRoot('ListagemServicoPage');
  }

  googleChartLibrary;
  ngOnInit() {
    this.useVanillaJSLibrary();
  }

  useVanillaJSLibrary() {
    this.googleChartLibrary = (<any>window).google;
    // Load the Visualization API and the corechart package.
    this.googleChartLibrary.charts.load('current', { 'packages': ['corechart'] });

    // Set a callback to run when the Google Visualization API is loaded.
    this.googleChartLibrary.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  drawChart () {
    // Create the data table.
    var data = new this.googleChartLibrary.visualization.DataTable();
    data.addColumn('date', '');
    data.addColumn('number', '');

    data.addRows([ [new Date(2019, 0), 0], [new Date(2019, 1), 10], [new Date(2019, 2), 7], [new Date(2019, 3), 9], [new Date(2019, 4), 4], 
    [new Date(2019, 5), 0], [new Date(2019, 6), 10], [new Date(2019, 7), 7], [new Date(2019, 8), 9], [new Date(2019, 9), 4],]
    );

    var options = {
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
      title: 'Serviços Realizados',
      series: {
        0: { color : "#00FF00" }
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

    // Instantiate and draw our chart, passing in some options.
    var chart = new this.googleChartLibrary.visualization
      .LineChart(document.getElementsByClassName(""));

    chart.draw(data, options);
  }
}
