import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalheServicoPage } from './detalhe-servico';

@NgModule({
  declarations: [
    DetalheServicoPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalheServicoPage),
  ],
})
export class DetalheServicoPageModule {}