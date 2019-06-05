import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DashboardPage } from './dashboard';
import { ItemListDashboardModule } from '../../components/item-list-dashboard/item-list-dashboard.module';

@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardPage),
    ItemListDashboardModule
  ],
})
export class DashboardPageModule {}
