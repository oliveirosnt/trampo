import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CancelamentoServicoPage } from './cancelamento-servico';

@NgModule({
  declarations: [
    CancelamentoServicoPage,
  ],
  imports: [
    IonicPageModule.forChild(CancelamentoServicoPage),
  ],
})
export class CancelamentoServicoPageModule {}
