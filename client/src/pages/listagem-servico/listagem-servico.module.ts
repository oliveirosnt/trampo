import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListagemServicoPage } from './listagem-servico';
import { ItemListServicoModule } from '../../components/item-list-servico/item-list-servico.module';

@NgModule({
    declarations: [
        ListagemServicoPage,
    ],
    imports: [
        IonicPageModule.forChild(ListagemServicoPage),
        ItemListServicoModule
    ],
})
export class ListagemServicoPageModule { }