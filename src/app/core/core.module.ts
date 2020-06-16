import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthInterceptor } from './interceptor/auth-interceptor.service';



@NgModule({
  declarations: [AuthInterceptor],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
