import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CadastroClientePage } from './cadastro-cliente';
import {ImagePageModule} from "../image/image.module";

@NgModule({
  declarations: [
    CadastroClientePage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroClientePage),
    ReactiveFormsModule,
    ImagePageModule
  ],
})
export class CadastroClientePageModule {}
