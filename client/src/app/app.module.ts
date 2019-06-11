import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
//import { LocationStrategy, PathLocationStrategy } from '@angular/common'; //Ativar essa função na SPRINT 4
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

import { MyApp } from './app.component';
import { CadastroUsuarioService } from '../services/cadastro-usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { AutenticacaoService } from '../services/autenticacao.service';
import { StorageService } from '../services/storage.service';
import { EspecialidadesService } from '../services/especialidades.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { UsuarioService } from '../services/usuario.service'
import { ServicoClienteService } from '../services/servico-cliente.service';
import { ServicoFornecedorService } from '../services/servico-fornecedor.service';
import { RedefinicaoSenhaService } from '../services/redefinicao-senha.service';
import { AvaliacaoService } from '../services/avaliacao.service';
import { Ng2GoogleChartsModule } from "ng2-google-charts";

@NgModule({
    declarations: [
        MyApp
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpClientModule,
        Ng2GoogleChartsModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp
    ],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        // {provide: LocationStrategy, useClass: PathLocationStrategy},  //Ativar essa função na SPRINT 4
        Base64,
        ImagePicker,
        CadastroUsuarioService,
        AutenticacaoService,
        StorageService,
        EspecialidadesService,
        AuthInterceptorProvider,
        ServicoClienteService,
        ServicoFornecedorService,
        UsuarioService,
        ServicoFornecedorService,
        RedefinicaoSenhaService,
        AvaliacaoService
    ]
})
export class AppModule { }
