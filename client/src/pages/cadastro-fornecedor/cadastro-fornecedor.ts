import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CadastroUsuarioService } from '../../services/cadastro-usuario.service';
import { EspecialidadesService } from '../../services/especialidades.service';
import { DadosUsuarioDTO } from '../../models/dados-usuario.dto';
import {ImageModel} from "../../models/image.model";
import {FileService} from "../../services/file.service";

@IonicPage()
@Component({
  selector: 'page-cadastro-fornecedor',
  templateUrl: 'cadastro-fornecedor.html',
})
export class CadastroFornecedorPage {

  especialidades : string[] = [];

  image: ImageModel = {
    hasPhoto: false,
    preview: 'assets/imgs/default-avatar2.png',
    currentFiles: null,
    type: 'singleFile',
    style: 'button',
    identifications: []
  };
  
  dados_fornecedor : DadosUsuarioDTO = {
    id: null,
    tipo: "FORNECEDOR",
    fotoPerfil : "",
    nomeCompleto : "",
    login : "",
    email : "",
    senha : "",
    conf_senha : "",
    avaliacao: null,
    listaEspecialidades : []
  };

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public cadastro: CadastroUsuarioService,
    public especialidadesService: EspecialidadesService,
    private fileService: FileService) {
      this.getEspecialidades();

  }

  cadastrar(){
    let alert : boolean = false;
    let myMessage : string = "";
    if (this.dados_fornecedor.nomeCompleto.length == 0){
      alert = true;
      myMessage += "*Nome inválido\n";
    }
    if (this.dados_fornecedor.login.length < 4){
      alert = true;
      myMessage += "*Username inválido\n"
    }
    if (this.dados_fornecedor.email.length < 3 && !this.dados_fornecedor.email.includes("@")){
      alert = true;
      myMessage += "*Email inválido\n";
    }
    if (this.dados_fornecedor.senha.length < 4 || this.dados_fornecedor.senha != this.dados_fornecedor.conf_senha){
      alert = true;
      myMessage += "*Senha inválida\n";
    }
    if (alert){
      let alertMessage = this.alertCtrl.create({
        title: "Problemas no cadastro",
        message: myMessage,
        buttons: [{
          text: 'Ok'
        }]
      });
      alertMessage.present();
      return;
    }

    if(this.image.hasPhoto) {
      this.fileService.generateIdentifications(this.image);
      this.dados_fornecedor.fotoPerfil = this.image.identifications[0];
    }

    this.cadastro.cadastrar_fornecedor(this.dados_fornecedor)
    .subscribe(() => {
      if(this.image.hasPhoto) {
        this.fileService.startUpload(this.image, () => {
          let alertMessage = this.alertCtrl.create({
            title: "Cadastro efetuado com sucesso",
            message: "Bem vindo!",
            buttons: [{
              text: 'Ok'
            }]
          });
          alertMessage.present();
          this.navCtrl.setRoot('LoginPage');
        });
      } else {
        let alertMessage = this.alertCtrl.create({
          title: "Cadastro efetuado com sucesso",
          message: "Bem vindo!",
          buttons: [{
            text: 'Ok'
          }]
        });
        alertMessage.present();
        this.navCtrl.setRoot('LoginPage');
      }

    },
    error => {
      let alertMessage = this.alertCtrl.create({
        title: "Problema no cadastro",
        message: error.error.message,
        buttons: [{
          text: 'Ok'
        }]
      });
      alertMessage.present();
    });
  }

  getEspecialidades(){
    this.especialidadesService.getEspecialidades().subscribe(response => {
      for (var key in response.body){
        this.especialidades.push(response.body[key]['nome']);    
      }
    });      
  }

}
