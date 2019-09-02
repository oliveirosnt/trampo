import { Component, Input } from '@angular/core';
import { AlertController, IonicPage, NavController } from 'ionic-angular';
import { ServicoDTO } from "../../../models/servico.dto";
import { OfertaDTO } from "../../../models/oferta.dto";
import { ServicoClienteService } from "../../../services/servico-cliente.service";

@IonicPage()
@Component({
  selector: 'page-item-oferta',
  templateUrl: 'item-oferta.html',
})
export class ItemOfertaPage {

  @Input('oferta') oferta: OfertaDTO;

  @Input('servico') servico: ServicoDTO;

  imgPerfil: string = 'assets/imgs/default-avatar.png';


  ionViewDidLoad() {
    if(this.oferta.fornecedor.fotoPerfil !== undefined && this.oferta.fornecedor.fotoPerfil !== '' ) {
      this.imgPerfil = this.oferta.fornecedor.fotoPerfil;
    }
  }

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
    this.servicoService.aceitarServico(this.servico.id, this.oferta.id).subscribe(
      response => {
        let alertMessage = this.alertCtrl.create({
          message: response.body['message'],
          buttons: [{
            text: 'Ok'
          }]
        });
        alertMessage.present();
        const servicoAtualizado = response.body['data'];
        this.navCtrl.getPrevious()['data']['servico'] = servicoAtualizado;
        this.navCtrl.getPrevious()['data']['ofertas'] = servicoAtualizado.ofertasRecebidas;
        this.navCtrl.pop();
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

  getMediaAvaliacao(nota: number) {
    return ((nota/5.0)*100) + '%';

  }
}
