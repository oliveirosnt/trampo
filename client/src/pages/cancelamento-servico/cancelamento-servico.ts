import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {ServicoDTO} from "../../models/servico.dto";
import {ServicoFornecedorService} from "../../services/servico-fornecedor.service";

/**
 * Generated class for the CancelamentoServicoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cancelamento-servico',
  templateUrl: 'cancelamento-servico.html',
})
export class CancelamentoServicoPage {

  servico: ServicoDTO;
  justificativa: any;
  data: any = {};
  motivo: string = '';
  descricaoHorarioServico: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController, private servicoFornecedorService: ServicoFornecedorService) {
    this.servico = this.navParams.get('servico');
    let dataAgora = new Date();

    const dataServico = new Date(this.servico.data);

    if(dataServico.getTime() > dataAgora.getTime()) {
      this.data = {
        items: [
          {
            id: 1,
            title: 'Não terei disponibilidade para atender o cliente na data marcada'
          },
          {
            id: 2,
            title: 'Não tenho mais interesse no serviço do cliente'
          },
          {
            id: 6,
            title: 'Outro'
          }
        ]
      };

      this.descricaoHorarioServico = "Serviço aguardando data de realização.";
    } else {
      this.data = {
        items: [
          {
            id: 1,
            title: 'Cliente não estava presente no local'
          },
          {
            id: 2,
            title: 'Condições climáticas não favoráveis'
          },
          {
            id: 3,
            title: 'Não há estrutura necessária para a realização do serviço'
          },
          {
            id: 4,
            title: 'O serviço não é o mesmo especificado pelo cliente'
          },
          {
            id: 5,
            title: 'Impedimento de realizar o serviço devido o horário'
          },
          {
            id: 6,
            title: 'Outro'
          }
        ]
      };

      this.descricaoHorarioServico = "Serviço em andamento.";
    }
  }

  ionViewDidLoad() {

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  cancelaServicoFornecedor() {
    this.servicoFornecedorService.cancelaServico(this.servico).subscribe(
      response => {
        this.viewCtrl.dismiss({message: response.body['message']});
      }, error => {
        this.viewCtrl.dismiss({message: error.error['message']});
      }
    )
  }

  disponivelCancelar() {
    if(this.justificativa !== null && this.justificativa !== undefined) {
      if(this.justificativa === 6) {
        return this.motivo.trim() === '';
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

}
