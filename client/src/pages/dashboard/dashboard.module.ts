import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import { ItemListDashboardModule } from '../../components/item-list-dashboard/item-list-dashboard.module';
import {Ng2GoogleChartsModule} from "ng2-google-charts";
import {SpinnerModule} from "../../components/spinner/spinner.module";

@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardPage),
    ItemListDashboardModule,
    Ng2GoogleChartsModule,
    SpinnerModule
  ],
})
export class DashboardPageModule {}
