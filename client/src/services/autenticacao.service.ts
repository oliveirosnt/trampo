import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { LocalUser } from "../models/local-user";
import { StorageService } from "./storage.service";
import { JwtHelper } from "angular2-jwt";
import {Push, PushObject, PushOptions} from "@ionic-native/push/ngx";
import {UsuarioService} from "./usuario.service";


@Injectable()
export class AutenticacaoService {

    jwtHelper: JwtHelper = new JwtHelper();
    constructor(public http: HttpClient,
        public storage: StorageService,  private push: Push, private usuarioService: UsuarioService){
    }

    login(creds : CredenciaisDTO){
        return this.http.post(
            `${API_CONFIG.baseUrl}/api/login`,
            creds,
            {
                observe: 'response',
                responseType: 'json'
            });
    }

    successfulLogin(data : any){
        const token = data["token"];
        let user : LocalUser = {
            token: token,
            username: data["usuario"]["login"],
            user: data["usuario"]
        }
        this.storage.setLocalUser(user);
    }

    logout(){
      const options: PushOptions = {
        android: {
          senderID: '698730155654',
          forceShow: true,
          icon:'notification',
        },
        ios: {
          alert: 'true',
          badge: true,
          sound: 'false'
        }
      }

      const pushObject: PushObject = this.push.init(options);

      this.usuarioService.getMyUser().subscribe((response) => {
        const user = response['data'];
        if(user.tipo === 'FORNECEDOR') {
          const specialities = user.listaEspecialidades;
          specialities.map((speciality) => {
            const currentTopic = speciality['nome'].toLowerCase();
            pushObject.unsubscribe(currentTopic).then((response) => console.log(response), (err) => console.log(err));
          })

        }

        this.usuarioService.atualizaFcmToken("").subscribe(() => {}, () => {});

        this.storage.setLocalUser(null);
      }, (err) => {
        console.log(err);
      })

    }


}
