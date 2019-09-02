import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeClientePage } from './home-cliente';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import {SpinnerModule} from "../../components/spinner/spinner.module";

@NgModule({
  declarations: [
    HomeClientePage,
  ],
  imports: [
    IonicPageModule.forChild(HomeClientePage),
    SpinnerModule
  ],
  providers: [
      Geolocation
  ]
})
export class HomeClientePageModule {}
