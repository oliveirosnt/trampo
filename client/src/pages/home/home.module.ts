import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { ItemListServicoModule } from '../../components/item-list-servico/item-list-servico.module';
import { HomePage } from './home';

@NgModule({
    declarations: [
        HomePage
    ],
    imports: [
        IonicPageModule.forChild(HomePage),
        ItemListServicoModule
    ],
})
export class HomePageModule { }
