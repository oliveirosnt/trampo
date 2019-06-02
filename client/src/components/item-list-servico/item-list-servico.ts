import { Component, Input } from '@angular/core';

import { ServicoDTO } from '../../models/servico.dto';

@Component({
    selector: 'item-list-servico',
    templateUrl: 'item-list-servico.html'
})
export class ItemListServicoComponent {

    @Input('servico') servico: ServicoDTO;

    constructor() { }

  getEstadoServicoFormatado() {
    let estado = '';
    if(this.servico.tipoStatus === 'AGUARDANDO_OFERTAS') {
      estado = "Aguardando Ofertas";
    } else if (this.servico.tipoStatus === 'ACEITO') {
      estado = "Aguardando Realização";
    } else if (this.servico.tipoStatus === 'CANCELADO') {
      estado = "Cancelado";
    } else {
      estado = "Concluído";
    }

    return estado;
  }

  getDataServicoFormatada() {
      const partesData = this.servico.data.split('-');

      const meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
      const mesIndex = parseInt(partesData[1]);
      return partesData[2] + ' de ' + meses[mesIndex - 1] + ' de ' + partesData[0];
  }

  formataArea() {
      let area = '';

      area += this.servico.tipo[0].toUpperCase();
      for (let i = 1; i < this.servico.tipo.length; i ++ ) {
          if(this.servico.tipo[i] === ' ') {
            if((i + 1) < this.servico.tipo.length) {
              area += this.servico.tipo[i].toUpperCase();
            }
          } else  {
            area += this.servico.tipo[i];
          }


      }
      return area
  }
}
