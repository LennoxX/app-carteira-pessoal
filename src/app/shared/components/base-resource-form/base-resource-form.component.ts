import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-base-resource-form',
  templateUrl: './base-resource-form.component.html',
  styleUrls: ['./base-resource-form.component.css']
})
export abstract class BaseResourceFormComponent<T> implements OnInit, AfterContentChecked {

  currentAction: string;
  loading = false;
  resource: T;
  resourceForm: FormGroup;
  resourceId;
  pageTitle: string;
  submittingForm = false;
  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(protected confirmationService: ConfirmationService) { }
  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  ngOnInit(): void {
    this.setCurrentAction();
    this.loadResource();
    this.buildForm();
  }

  protected setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  submitForm() {
    this.confirmationService.confirm({
      message: 'Você tem certeza que deseja salvar os dados?',
      accept: () => {
        if (this.currentAction === 'new') {
          this.createResource();
        } else {
          this.updateResource();
        }
      }
    });

  }
   protected abstract loadResource();

  protected abstract buildForm();

  protected abstract setPageTitle();


  protected abstract createResource();

  protected abstract updateResource();

}
