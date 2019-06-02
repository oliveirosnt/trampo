import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemOfertaPage } from './item-oferta';

@NgModule({
  declarations: [
    ItemOfertaPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemOfertaPage),
  ],
  exports: [ItemOfertaPage]
})
export class ItemOfertaPageModule {}
