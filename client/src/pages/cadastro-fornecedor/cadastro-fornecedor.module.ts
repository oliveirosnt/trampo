import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroFornecedorPage } from './cadastro-fornecedor';

@NgModule({
  declarations: [
    CadastroFornecedorPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroFornecedorPage),
  ],
})
export class CadastroFornecedorPageModule {}
