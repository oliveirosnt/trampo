import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPerfilPage } from './edit-perfil';
import {ImagePageModule} from "../image/image.module";

@NgModule({
  declarations: [
    EditPerfilPage,
  ],
  imports: [
    IonicPageModule.forChild(EditPerfilPage),
    ImagePageModule
  ],
})
export class EditPerfilPageModule {}
