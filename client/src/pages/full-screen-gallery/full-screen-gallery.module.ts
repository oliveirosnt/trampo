import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FullScreenGalleryPage } from './full-screen-gallery';

@NgModule({
  declarations: [
    FullScreenGalleryPage,
  ],
  exports:[FullScreenGalleryPage],
  imports: [
    IonicPageModule.forChild(FullScreenGalleryPage),
  ],
})
export class FullScreenGalleryPageModule {}
