import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListagemServicoAceitosPage } from './listagem-servico-aceitos';
import { ItemListServicoModule } from '../../components/item-list-servico/item-list-servico.module';

@NgModule({
    declarations: [
        ListagemServicoAceitosPage,
    ],
    imports: [
        IonicPageModule.forChild(ListagemServicoAceitosPage),
        ItemListServicoModule
    ],
})
export class ListagemServicoAceitosPageModule { }
