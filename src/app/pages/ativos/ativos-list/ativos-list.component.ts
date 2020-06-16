import { ConfirmationService } from 'primeng/api';
import { ToastComponent } from './../../../shared/components/toast/toast.component';
import { Component, OnInit } from '@angular/core';
import { Ativo } from 'src/app/shared/models/ativo.model';
import { AtivoService } from 'src/app/shared/services/ativo.service';

@Component({
  selector: 'app-ativos-list',
  templateUrl: './ativos-list.component.html',
  styleUrls: ['./ativos-list.component.css']
})
export class AtivosListComponent implements OnInit {

  ativos: Ativo[];
  loading = false;
  constructor(private ativoService: AtivoService, private toastComponent: ToastComponent, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    //  this.ativoService.teste();
    this.loadResources();
  }

  loadResources() {
    this.loading = true;
    this.ativoService.getAll().subscribe(res => {
      this.ativos = res.map(e => {
        return {
          id: e.payload.doc.id, nome: e.payload.doc.get('nome'),
          sigla: e.payload.doc.get('sigla'),
          tipo: e.payload.doc.get('tipo')
        } as Ativo;
      });
      this.loading = false;
    },
      (err) => {
        this.loading = false;
      });
  }

  excluirAtivo(id) {
    this.confirmationService.confirm({
      message: 'Você tem certeza que excluir o ativo?',
      accept: () => {
        this.ativoService.delete(id).then((res) => {
          this.toastComponent.showSuccessMessage('Ativo excluído com sucesso!');
        }).catch((err) => {
          this.toastComponent.showErrorMessage('Erro ao excluir o ativo!');
        });
      }
    });

  }
}

