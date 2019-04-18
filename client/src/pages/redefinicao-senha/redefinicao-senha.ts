import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { RedefinicaoSenhaService } from '../../services/redefinicao-senha.service';
import { RedefinirSenhaWrapper } from "../../models/redefinir-senha-wrapper";

@IonicPage()
@Component({
  selector: 'page-redefinicao-senha',
  templateUrl: 'redefinicao-senha.html',
})
export class RedefinicaoSenhaPage {


  redefinirSenha: RedefinirSenhaWrapper = {
    email: ""
  };

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
    this.redefinicaoCtrl.redefinirSenha(this.redefinirSenha).subscribe(response => {
      alert.setTitle("Senha Redefinida!")
      alert.setMessage("Uma nova senha foi enviada para o email")
    }, error => {
      alert.setTitle("Atenção!")
      alert.setMessage(error.error.message)
    })
    alert.present();
  }

}
