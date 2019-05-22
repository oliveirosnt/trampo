import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CadastroOfertaPage } from './cadastro-oferta';

@NgModule({
  declarations: [
    CadastroOfertaPage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroOfertaPage),
  ],
  exports:[CadastroOfertaPage]
})
export class CadastroOfertaPageModule {}
