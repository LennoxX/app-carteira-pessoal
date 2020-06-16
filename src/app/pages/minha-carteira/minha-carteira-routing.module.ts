import { FormPosicaoComponent } from './form-composicao/form-posicao.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MinhaCarteiraListComponent } from './minha-carteira-list/minha-carteira-list.component';


const routes: Routes = [
  {path: '', component: MinhaCarteiraListComponent},
  {path: 'posicao/new', component: FormPosicaoComponent},
  {path: 'posicao/:id/edit', component: FormPosicaoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinhaCarteiraRoutingModule { }
