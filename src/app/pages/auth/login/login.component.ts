import { UserService } from './../../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from './model/LoginRequest';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  loginRequest: LoginRequest = new LoginRequest();
  userData: any;
  user: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private formBuilder: FormBuilder,
    private userService: UserService) {
    this.afAuth.authState.subscribe(user => {
      this.user = afAuth.authState;
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        this.router.navigateByUrl('minha-carteira');
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  ngOnInit(): void {

    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.loading = true;
    this.loginRequest.username = this.loginForm.controls.username.value;
    this.loginRequest.password = this.loginForm.controls.password.value;

    this.authenticate(this.loginRequest);
  }

  authenticate(loginRequest: LoginRequest) {
    return this.afAuth.signInWithEmailAndPassword(loginRequest.username, loginRequest.password)
      .then((result) => {
        this.userService.storeUser(result.user);

        this.router.navigate(['/minha-carteira']);
      }).catch((error) => {
        this.loading = false;
        window.alert(error.message);
      });
  }

}
