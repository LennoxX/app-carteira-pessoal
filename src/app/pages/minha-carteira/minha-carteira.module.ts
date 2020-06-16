import { SharedComponentsModule } from 'src/app/shared/components/shared-components.module';
import { TableModule } from 'primeng/table';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinhaCarteiraRoutingModule } from './minha-carteira-routing.module';
import { MinhaCarteiraListComponent } from './minha-carteira-list/minha-carteira-list.component';
import { FormPosicaoComponent } from './form-composicao/form-posicao.component';



@NgModule({
  declarations: [MinhaCarteiraListComponent, FormPosicaoComponent],
  imports: [
    CommonModule,
    MinhaCarteiraRoutingModule,
    SharedComponentsModule
  ]
})
export class MinhaCarteiraModule { }
