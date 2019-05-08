import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AvaliacaoPage } from './avaliacao';

import { IonicRatingModule } from 'ionic-rating';

@NgModule({
  declarations: [
    AvaliacaoPage,
  ],
  imports: [
    IonicRatingModule,
    IonicPageModule.forChild(AvaliacaoPage),
  ],
})
export class AvaliacaoPageModule {}
