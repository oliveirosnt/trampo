import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { Spinner } from './spinner';
import {IonicPageModule} from "ionic-angular";
@NgModule({
	declarations: [Spinner],
	imports: [IonicPageModule.forChild(Spinner),],
	exports: [Spinner],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SpinnerModule {}
