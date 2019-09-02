import {Component, Input} from '@angular/core';
import {IonicPage} from "ionic-angular";

/**
 * Generated class for the SpinnerComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@IonicPage()
@Component({
  selector: 'spinner',
  templateUrl: 'spinner.html'
})
export class Spinner {
  @Input('data') data: any;
  path: string;

  constructor() {  }

  getData = ():any => {
    return this.data;
  }

  ngOnChanges(changes: {[propKey: string]: any}) {
    this.path = "assets/svg/" +  changes['data'].currentValue.icon + ".svg";
  }
}
