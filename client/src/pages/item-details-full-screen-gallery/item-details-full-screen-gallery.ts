import {Component, Input} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ItemDetailsFullScreenGalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-item-details-full-screen-gallery',
  templateUrl: 'item-details-full-screen-gallery.html',
})
export class ItemDetailsFullScreenGalleryPage {

  screens: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if(this.navParams.get('screens')) {
      this.screens = this.navParams.get('screens');
    }
  }

  ionBackPage() {
    this.navCtrl.pop();
  }

}
