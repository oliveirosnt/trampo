import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListagemOfertasPage } from './listagem-ofertas';
import { ItemOfertaPageModule } from "./item-oferta/item-oferta.module";

@NgModule({
  declarations: [
    ListagemOfertasPage,
  ],
  imports: [
    IonicPageModule.forChild(ListagemOfertasPage),
    ItemOfertaPageModule
  ],
})
export class ListagemOfertasPageModule {}
