import { SharedComponentsModule } from './../../shared/components/shared-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtivosRoutingModule } from './ativos-routing.module';
import { AtivosListComponent } from './ativos-list/ativos-list.component';
import { AtivoFormComponent } from './ativo-form/ativo-form.component';


@NgModule({
  declarations: [AtivosListComponent, AtivoFormComponent],
  imports: [
    CommonModule,
    AtivosRoutingModule,
    SharedComponentsModule
  ]
})
export class AtivosModule { }
