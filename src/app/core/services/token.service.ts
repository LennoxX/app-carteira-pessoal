import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() { }

  storeToken(token: string) {
    localStorage.setItem('user', token);
  }

  getToken() {
    return localStorage.getItem('user');
  }

  deleteToken() {
    localStorage.removeItem('user');
  }
}
