import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { CadastroClientePage } from './cadastro-cliente';

@NgModule({
  declarations: [
    CadastroClientePage,
  ],
  imports: [
    IonicPageModule.forChild(CadastroClientePage),
    ReactiveFormsModule
  ],
})
export class CadastroClientePageModule {}
