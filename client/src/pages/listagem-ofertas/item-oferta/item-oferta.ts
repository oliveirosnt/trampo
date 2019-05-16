import {Component, Input} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ServicoDTO} from "../../../models/servico.dto";
import {OfertaDTO} from "../../../models/oferta.dto";
import {ServicoClienteService} from "../../../services/servico-cliente.service";

@IonicPage()
@Component({
  selector: 'page-item-oferta',
  templateUrl: 'item-oferta.html',
})
export class ItemOfertaPage {

  @Input('oferta') oferta: OfertaDTO;

  @Input('servico') servico: ServicoDTO;

  imgPerfil: string = 'assets/imgs/default-avatar.png';

  constructor(
    public servicoService:ServicoClienteService,
    public alertCtrl: AlertController,
    public navCtrl: NavController) {
  }

  formataDinheiro() {
    const dinheiro = this.oferta.valor.toString().split('.');
    if(dinheiro[1] === undefined) {
      dinheiro[1] = '00';
    }
    return dinheiro[0] + ',' + dinheiro[1];
  }

  formataConclusaoServico() {
    const estimativa = this.oferta.estimativaConclusao.split(':');
    return estimativa[0] + ' horas e ' + estimativa[1] + ' minutos';
  }

  aceitarOferta() {
    this.limpaDadosQueNaoSeraoPersistidos();

    this.servicoService.aceitarServico(this.servico, this.oferta).subscribe(
      response => {
        console.log(response);
        let alertMessage = this.alertCtrl.create({
          message: response.body['message'],
          buttons: [{
            text: 'Ok'
          }]
        });
        alertMessage.present();
        this.navCtrl.setRoot('ListagemServicoPage');
      }, error => {
        let alertMessage = this.alertCtrl.create({
          message: error.error['message'],
          buttons: [{
            text: 'Ok'
          }]
        });
        alertMessage.present();
      }
    )
  }

  limpaDadosQueNaoSeraoPersistidos() {
    this.servico.id = undefined;
    this.oferta.id = undefined;
    this.servico.cliente.id = undefined;
    this.servico.endereco.id = undefined;
    this.oferta.fornecedor.id = undefined;
  }
}
