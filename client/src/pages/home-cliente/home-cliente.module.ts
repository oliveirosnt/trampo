import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomeClientePage } from './home-cliente';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@NgModule({
  declarations: [
    HomeClientePage,
  ],
  imports: [
    IonicPageModule.forChild(HomeClientePage)
  ],
  providers: [
      Geolocation
  ]
})
export class HomeClientePageModule {}
