import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Toast, ToasterService} from "angular2-toaster";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-password-screen',
  templateUrl: './password-screen.component.html',
  styleUrls: ['./password-screen.component.css']
})


export class PasswordScreenComponent implements OnInit {

  submitted = false;
  private toasterService: ToasterService;
  private recoverUrl: string = 'https://trampo-back.herokuapp.com/api/usuarios/senha?validarSenha=false';

  constructor(private route: ActivatedRoute, toasterService: ToasterService, private http: HttpClient) {
    this.toasterService = toasterService;
  }

  ngOnInit() {

    const token = this.route.snapshot.paramMap.get('token');

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token,
      })
    };
  }

  httpOptions: any;

  onSubmit(formValue: any) {

    const newPassword = {
      senhaNova: formValue.password,
      confirmacao: formValue.confirmPassword
    };

    let toast: Toast;

    this.http.post(this.recoverUrl, newPassword, this.httpOptions).subscribe((response) => {
       toast = {
        type: 'success',
        title: 'Recuperação de Senha',
        body: 'Sua senha foi alterada com sucesso!',
        showCloseButton: true
      };

      this.toasterService.pop(toast);

      this.submitted = true;

    }, (err) => {
        toast = {
          type: 'error',
          title: 'Recuperação de Senha',
          body: err['error']['message'],
          showCloseButton: true
        };

      this.toasterService.pop(toast);
    });
  }

}
