import { Router } from '@angular/router';

import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApplicationUser } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static usuario: ApplicationUser = null;
  constructor() {

  }

  getInstance(): ApplicationUser{
    if (localStorage.getItem('user')) {
      UserService.usuario = JSON.parse(localStorage.getItem('user'));
      return JSON.parse(localStorage.getItem('user')) as ApplicationUser;
    } else {
      return null;
    }

  }

  storeUser(usuario: ApplicationUser) {
    localStorage.setItem('user', JSON.stringify(usuario));
    UserService.usuario = usuario;
  }

  deleteUser() {
    localStorage.removeItem('user');
  }
}
