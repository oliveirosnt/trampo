import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { CadastroUsuarioService } from '../../services/cadastro-usuario.service';
import { DadosUsuarioDTO } from '../../models/dados-usuario.dto';
import { Cliente } from '../../models/cliente.model';

@IonicPage()
@Component({
  selector: 'page-cadastro-cliente',
  templateUrl: 'cadastro-cliente.html',
})
export class CadastroClientePage {

  imgPreview = 'assets/imgs/default-avatar.png';

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
    private formBuilder: FormBuilder,
    private imagePicker: ImagePicker) {

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

    const clienteToAdd = Cliente.parseFromCliente(this.clienteForm.value);

    this.cadastro.cadastrar_cliente(clienteToAdd).subscribe(response => {
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

  getPhoto() {
    let options = {
      maximumImagesCount: 1,
      outputType: 1
    };

    this.imagePicker.getPictures(options).then((results) => {
       for (let i = 0; i < results.length; i++) {
         if(results[i].trim() !== '') {
           this.imgPreview = 'data:image/jpeg;base64,' + results[i];
           this.dados_cliente.fotoPerfil = results[i];
         }

       }
     }, (err) => { }
    );
  }

}
