import { UserService } from './../../../core/services/user.service';
import { Carteira } from './../../../shared/models/carteira.model';
import { PosicaoService } from './../../../shared/services/posicao.service';
import { Ativo } from 'src/app/shared/models/ativo.model';
import { Validators, FormBuilder } from '@angular/forms';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Component, OnInit } from '@angular/core';
import { Posicao } from 'src/app/shared/models/posicao.model';
import { ConfirmationService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { AtivoService } from 'src/app/shared/services/ativo.service';
import { ToastComponent } from 'src/app/shared/components/toast/toast.component';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-form-posicao',
  templateUrl: './form-composicao.component.html',
  styleUrls: ['./form-posicao.component.css']
})
export class FormPosicaoComponent extends BaseResourceFormComponent<Posicao> implements OnInit {


  opcoes: Ativo[] = new Array();
  carteira: Carteira = new Carteira();

  constructor(protected formBuilder: FormBuilder,
    protected route: ActivatedRoute,
    protected router: Router,
    private ativoService: AtivoService,
    private posicaoService: PosicaoService,
    private toastComponent: ToastComponent,
    private userService: UserService,
    protected confirmationService: ConfirmationService) {
    super(confirmationService);
  }

  ngOnInit(): void {
    this.buildForm();
    super.ngOnInit();
    this.setCurrentAction();
    this.fillOpcoes();
  }


  fillOpcoes() {
    this.loading = true;
    this.ativoService.getAll().subscribe(res => {
      this.opcoes = res.map(e => {
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

  protected setCurrentAction() {
    if (this.route.snapshot.url[1].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  protected loadResource() {
    if (this.currentAction === 'edit') {
      this.loading = true;
      this.route.paramMap.pipe(
        switchMap(params => this.posicaoService.findById(params.get('id')))
      ).subscribe(
        (resource) => {
          this.resource = resource;
          this.resourceForm.patchValue(resource);
          this.loading = false;
        },
        (error) => {
          console.log(error);
          this.loading = false;
        }
      );
    }
  }
  protected buildForm() {
    this.resourceForm = this.formBuilder.group({
      ativo: [null, Validators.required],
      quantidade: [null, Validators.required],
      valorMedioCompra: [null, Validators.required]
    });
  }
  protected setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Nova Posição';
    } else {
      this.pageTitle = 'Editando Posição';
    }
  }
  protected createResource() {
    this.submittingForm = true;
    const posicao: Posicao = Object.assign(new Posicao(), this.resourceForm.value);
    posicao.userId = this.userService.getInstance().uid;

    this.posicaoService.create(posicao)
      .catch((err) => {
        this.router.navigateByUrl('/minha-carteira').then((res) => {
          this.toastComponent.showErrorMessage('Ocorreu um Erro' + err);
        });
      }).then((status) => {
        this.router.navigateByUrl('/minha-carteira').then(() => {
          this.toastComponent.showSuccessMessage('Posição salva com sucesso!');
        });
      });

  }
  protected updateResource() {
    this.submittingForm = true;
    const posicao: Posicao = Object.assign(new Posicao(), this.resourceForm.value);
    this.route.paramMap.pipe(
      switchMap(params => this.resourceId = params.get('id'))
    ).subscribe(
      () => {
        this.posicaoService.update(posicao, this.resourceId).catch(
          (err) => {
            this.router.navigateByUrl('/minha-carteira').then(() => {
              this.toastComponent.showErrorMessage('Ocorreu um Erro' + err);
            });
          }
        );
        this.router.navigateByUrl('/minha-carteira').then(() => {
          this.toastComponent.showSuccessMessage('Posição editada com sucesso!');
        });
      },
      (error) => {
        this.loading = false;
      }
    );

  }
}



