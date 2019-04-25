import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { SenhaAtualizadaDTO } from '../../models/senha-atualizada.dto';
import { UsuarioService } from '../../services/usuario.service';

@IonicPage()
@Component({
  selector: 'page-atualiza-senha',
  templateUrl: 'atualiza-senha.html',
})
export class AtualizaSenhaPage {

  dadosSenha : SenhaAtualizadaDTO = {
    senhaAntiga : "",
    senhaNova : "",
    confirmacao : ""
  };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public usuarioService: UsuarioService,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtualizaSenhaPage');
  }

  atualizar(dadosSenha : SenhaAtualizadaDTO){
    this.usuarioService.atualizaSenha(dadosSenha).subscribe(
      response => {
        let alertMessage = this.alertCtrl.create({
          message: response.body['message'],
          buttons: [{
            text: 'Ok'
          }]
        });
        alertMessage.present();
        this.viewCtrl.dismiss();
      }, error => {
        let alertMessage = this.alertCtrl.create({
          message: error.error['message'],
          buttons: [{
            text: 'Ok'
          }]
        });
        alertMessage.present();
      });
  }

  cancelar() {
    this.viewCtrl.dismiss();
  }

}
