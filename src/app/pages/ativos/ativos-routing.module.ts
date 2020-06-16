import { AtivoFormComponent } from './ativo-form/ativo-form.component';
import { AtivosListComponent } from './ativos-list/ativos-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: '', component: AtivosListComponent},
  {path: 'new', component: AtivoFormComponent},
  {path: ':id/edit', component: AtivoFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtivosRoutingModule { }
