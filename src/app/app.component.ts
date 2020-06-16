import { ApplicationUser } from './core/models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart, ActivatedRoute, NavigationCancel } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from './core/services/user.service';
import { filter } from 'rxjs/operators';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  showComponents: boolean;
  title = 'app-carteira-pessoal';
  currentUser: ApplicationUser;

  constructor(private router: Router,
              private userService: UserService) {
    router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(() => {
      this.currentUser = this.userService.getInstance();
    });
  }

  ngOnInit() {

    this.verifyComponentsVisibility();
    this.currentUser = this.userService.getInstance();
  }

  verifyComponentsVisibility() {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event.url.endsWith('/login')) {
          this.showComponents = false;
        } else {
          this.showComponents = true;
        }
      } else if (event instanceof NavigationCancel) {
        this.showComponents = false;
      }
    });
  }

}
