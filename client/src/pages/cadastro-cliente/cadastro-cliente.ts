import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { CadastroUsuarioService } from '../../services/cadastro-usuario.service';
import { DadosUsuarioDTO } from '../../models/dados-usuario.dto';
import { Cliente } from '../../models/cliente.model';

@IonicPage()
@Component({
  selector: 'page-cadastro-cliente',
  templateUrl: 'cadastro-cliente.html',
})
export class CadastroClientePage {

  clienteForm: FormGroup;

  dados_cliente: DadosUsuarioDTO = {
    id: null,
    tipo: "",
    fotoPerfil: "",
    nomeCompleto: "",
    login: "",
    email: "",
    senha: "",
    conf_senha: "",
    avaliacao: null
  };

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public cadastro: CadastroUsuarioService,
    private formBuilder: FormBuilder) {

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
    console.log(this.clienteForm.value);

    this.cadastro.cadastrar_cliente(Cliente.parseFromCliente(this.clienteForm.value)).subscribe(response => {
      console.log(response.headers.get('Authorization'));
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
      console.log(error)
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
