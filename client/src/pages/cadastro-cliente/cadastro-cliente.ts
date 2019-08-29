import {Component} from '@angular/core';
import {
  IonicPage,
  NavController,
  AlertController
} from 'ionic-angular';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { CadastroUsuarioService } from '../../services/cadastro-usuario.service';

import {ImageModel} from "../../models/image.model";
import {FileService} from "../../services/file.service";
import {Cliente} from "../../models/cliente.model";

@IonicPage()
@Component({
  selector: 'page-cadastro-cliente',
  templateUrl: 'cadastro-cliente.html',
})
export class CadastroClientePage {

  clienteForm: FormGroup;


  image: ImageModel = {
    hasPhoto: false,
    preview: 'assets/imgs/default-avatar.png',
    currentFiles: null,
    type: 'singleFile',
    style: 'button',
    identifications: []
  };


  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public cadastro: CadastroUsuarioService,
    private formBuilder: FormBuilder,
    private fileService: FileService
    ) {

      this.clienteForm = this.formBuilder.group({
        nomeCompleto: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(6)
        ])),
        login: new FormControl('', Validators.compose([
          Validators.required,
          Validators.minLength(4)
        ])),
        email: new FormControl('', Validators.compose([
          Validators.required, Validators.minLength(6), Validators.email
        ])),
        senha: new FormControl('', Validators.required),
        conf_senha: new FormControl('', Validators.required)
      });
  }

  cadastrar() {
    const clienteToAdd = Cliente.parseFromCliente(this.clienteForm.value);

    if (this.image.hasPhoto) {
      this.fileService.generateIdentifications(this.image);
      clienteToAdd.fotoPerfil = this.image.identifications[0];
    }

    this.cadastro.cadastrar_cliente(clienteToAdd).subscribe( () => {

      if(this.image.hasPhoto) {
        this.fileService.startUpload(this.image);
      }

      let alertMessage = this.alertCtrl.create({
        title: "Cadastro efetuado com sucesso",
        message: "Bem vindo!",
        buttons: [{
          text: 'Ok'
        }]
      });
      alertMessage.present();
      this.navCtrl.setRoot('LoginPage');
    }, error => {

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


}
