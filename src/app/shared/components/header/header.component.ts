import { ApplicationUser } from './../../../core/models/usuario.model';
import { UserService } from './../../../core/services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: ApplicationUser = new ApplicationUser();

  constructor(private firebaseAuth: AngularFireAuth, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.user = this.userService.getInstance();
  }

  logout() {
    this.firebaseAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigateByUrl('/auth/login');
    }
    );
  }
}
