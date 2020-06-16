import { MenuComponent } from './menu/menu.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ToastComponent } from './toast/toast.component';
import { TableModule } from 'primeng/table';
import {TooltipModule} from 'primeng/tooltip';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {SelectButtonModule} from 'primeng/selectbutton';
import {DropdownModule} from 'primeng/dropdown';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ToastComponent,
    MenuComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    TableModule,
    TooltipModule,
    ReactiveFormsModule,
    FormsModule,
    ToggleButtonModule,
    DropdownModule,
    SelectButtonModule,
    ConfirmDialogModule,
    CurrencyMaskModule,
    ChartsModule,
    SweetAlert2Module.forRoot()
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    ToastComponent,
    TooltipModule,
    ReactiveFormsModule,
    FormsModule,
    ToggleButtonModule,
    SelectButtonModule,
    TableModule,
    ConfirmDialogModule,
    DropdownModule,
    CurrencyMaskModule,
    ChartsModule
  ],
  providers: [
    ToastComponent
  ]
})
export class SharedComponentsModule { }
