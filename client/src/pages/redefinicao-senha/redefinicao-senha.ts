import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { RedefinicaoSenhaService } from '../../services/redefinicao-senha.service';

@IonicPage()
@Component({
  selector: 'page-redefinicao-senha',
  templateUrl: 'redefinicao-senha.html',
})
export class RedefinicaoSenhaPage {

  mail = "";

  constructor(public navCtrl: NavController,
    private alertCtrl: AlertController,
    public redefinicaoCtrl: RedefinicaoSenhaService) {
  }

  redefinicao(){
    let alert = this.alertCtrl.create({
      buttons: [{
          text: 'Ok'
      }]
    });
    this.redefinicaoCtrl.redefinirSenha(this.mail).subscribe(response => {
      alert.setTitle("Senha Redefinida!")
      alert.setMessage("Uma nova senha foi enviada para o email")
    }, error => {
      alert.setTitle("Atenção!")
      alert.setMessage(error.error.message)
    })
    alert.present();
  }

}
