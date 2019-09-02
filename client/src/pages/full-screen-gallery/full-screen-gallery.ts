import {Component, Input, ViewChild} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';

/**
 * Generated class for the FullScreenGalleryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-full-screen-gallery',
  templateUrl: 'full-screen-gallery.html',
})
export class FullScreenGalleryPage {
  @Input() screens: any;
  @ViewChild('slider') slider: Slides;
  public isLocked: boolean = false;
  sliderOptions: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.sliderOptions = {
      pager: true
    };
  }


  ionViewDidLoad() {
    this.sliderOptions = {
      pager:true,
      loop: true,
      zoom:true,
      initialSlide:0
    };
    debugger;
  }

}
