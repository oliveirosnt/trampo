import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {ImagesProvider} from "../../providers/images/images";

/**
 * Generated class for the UploadModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload-modal',
  templateUrl: 'upload-modal.html',
})
export class UploadModalPage {

  imageData: any;
  desc: string;
  save: boolean;

  constructor(public navCtrl: NavController, private navParams: NavParams, private viewCtrl: ViewController) {
    this.imageData = this.navParams.get('data');
    this.save = this.navParams.get('save');
  }

  saveImage() {
    this.viewCtrl.dismiss({confirm: true});
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
