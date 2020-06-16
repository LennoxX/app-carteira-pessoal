import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ApplicationUser } from './../models/usuario.model';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate {
  usuario: ApplicationUser = new ApplicationUser();
  constructor(private router: Router, private afAuth: AngularFireAuth) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.afAuth.authState.pipe(map(e => {
      if (e) {
        return true;
      } else {
        this.router.navigate(['/auth/login']);
        return false;
      }
    }));
  }
}



