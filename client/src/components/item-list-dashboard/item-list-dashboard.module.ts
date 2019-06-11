import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular/module';

import { ItemListDashboardComponent } from './item-list-dashboard';

@NgModule({
    declarations: [ItemListDashboardComponent],
    imports: [IonicModule],
    exports: [ItemListDashboardComponent]
})
export class ItemListDashboardModule { }