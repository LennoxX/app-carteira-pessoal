import { ToastComponent } from './../../../shared/components/toast/toast.component';
import { AtivoService } from 'src/app/shared/services/ativo.service';
import { ConfirmationService } from 'primeng/api';
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseResourceFormComponent } from 'src/app/shared/components/base-resource-form/base-resource-form.component';
import { Ativo } from 'src/app/shared/models/ativo.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-ativo-form',
  templateUrl: './ativo-form.component.html',
  styleUrls: ['./ativo-form.component.css']
})
export class AtivoFormComponent extends BaseResourceFormComponent<Ativo> implements OnInit {

  tiposAtivo = new Array({
    label: 'Ação', value: 'acoes'
  }, { label: 'FII', value: 'fii' });

  constructor(protected formBuilder: FormBuilder,
    protected route: ActivatedRoute,
    protected router: Router,
    private ativoService: AtivoService,
    private toastComponent: ToastComponent,
    protected confirmationService: ConfirmationService) {
    super(confirmationService);
  }

  ngOnInit(): void {
    this.buildForm();
    super.ngOnInit();
    this.setCurrentAction();
  }



  protected setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitle = 'Novo Ativo';
    } else {
      this.pageTitle = 'Editando Ativo';
    }
  }

  buildForm() {
    this.resourceForm = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(4)]],
      sigla: [null, [Validators.required, Validators.minLength(5)]],
      tipo: [null, [Validators.required]]
    });
  }

  protected loadResource() {
    if (this.currentAction === 'edit') {
      this.loading = true;
      this.route.paramMap.pipe(
        switchMap(params => this.ativoService.findById(params.get('id')))
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


  protected createResource() {
    this.submittingForm = true;
    const ativo: Ativo = Object.assign(new Ativo(), this.resourceForm.value);
    this.ativoService.create(ativo)
      .catch((err) => {
        this.router.navigateByUrl('/ativos').then(() => {
          this.toastComponent.showErrorMessage('Ocorreu um Erro' + err);
        });
      }).then((status) => {
        this.router.navigateByUrl('/ativos').then(() => {
          this.toastComponent.showSuccessMessage('Ativo salvo com sucesso!');
        });
      });

  }
  protected updateResource() {
    this.submittingForm = true;
    const ativo: Ativo = Object.assign(new Ativo(), this.resourceForm.value);
    this.route.paramMap.pipe(
      switchMap(params => this.resourceId = params.get('id'))
    ).subscribe(
      () => {
        this.ativoService.update(ativo, this.resourceId).catch(
          (err) => {
            this.router.navigateByUrl('/ativos').then(() => {
              this.toastComponent.showErrorMessage('Ocorreu um Erro' + err);
            });
          }
        );
        this.router.navigateByUrl('/ativos').then(() => {
          this.toastComponent.showSuccessMessage('Ativo editado com sucesso!');
        });
      },
      (error) => {
        this.loading = false;
      }
    );

  }

}
