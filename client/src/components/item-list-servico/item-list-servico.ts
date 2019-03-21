import { Component, Input } from '@angular/core';

import { ServicoDTO } from '../../models/servico.dto';

@Component({
    selector: 'item-list-servico',
    templateUrl: 'item-list-servico.html'
})
export class ItemListServicoComponent {

    @Input('servico') servico: ServicoDTO;

    constructor() { }
}
