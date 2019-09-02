import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroFornecedorPage } from './cadastro-fornecedor';
import {ImagePageModule} from "../image/image.module";

@NgModule({
  declarations: [
    CadastroFornecedorPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroFornecedorPage),
    ImagePageModule
  ],
})
export class CadastroFornecedorPageModule {}
