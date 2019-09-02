import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemDetailsFullScreenGalleryPage } from './item-details-full-screen-gallery';
import {FullScreenGalleryPageModule} from "../full-screen-gallery/full-screen-gallery.module";

@NgModule({
  declarations: [
    ItemDetailsFullScreenGalleryPage,
  ], exports: [ItemDetailsFullScreenGalleryPage],
  imports: [
    IonicPageModule.forChild(ItemDetailsFullScreenGalleryPage),
    FullScreenGalleryPageModule
  ],
})
export class ItemDetailsFullScreenGalleryPageModule {}
