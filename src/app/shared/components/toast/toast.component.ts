import { Component, OnInit } from '@angular/core';

import swal from 'sweetalert2';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  showSuccessMessage(message?: string) {
    swal.fire({
      toast: true,
      titleText: 'Sucesso',
      text: message != null ? message : 'Solicitação processada com sucesso!',
      width: '350px',
      icon: 'success',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
      position: 'bottom-end',
    });
  }

  showErrorMessage(message?: string) {
    swal.fire({
      toast: true,
      titleText: 'Erro',
      text: message != null ? message : 'Erro ao processar sua solicitação!',
      width: '350px',
      icon: 'error',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
      position: 'bottom-end',
    });
  }

  showWarningMessage(message?: string) {
    swal.fire({
      toast: true,
      titleText: 'Atenção',
      text: message != null ? message : 'Atenção!',
      width: '350px',
      icon: 'warning',
      showConfirmButton: false,
      timerProgressBar: true,
      timer: 3000,
      position: 'bottom-end',
    });
  }

  showPopUp(message, title, type) {
    swal.fire(
      title,
      message,
      type
    );
  }

}
