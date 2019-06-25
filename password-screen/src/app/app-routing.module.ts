import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PasswordScreenComponent } from './password-screen/password-screen.component';

const routes: Routes = [
  { path: 'recuperar-senha/:token', component: PasswordScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
