import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AuthenticationService} from '../../services/authentication.service';
import {Router, RouterLink} from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  invalidId = false;
  mail = '';
  password = '';
  user: BehaviorSubject<any>;
  error = false;

  constructor(private authenticationService: AuthenticationService,
    private routerLink: Router,
  ) {
    this.user = this.authenticationService.user;
  }

  ngOnInit(): void {
    // Does nothing
  }

  onLogin() {

    this.authenticationService.login(this.mail, this.password).subscribe((res: any) => {
      if (Object.keys(res).length > 0) {
        localStorage.setItem("token", res.accessToken);

        this.authenticationService.getUser(res.accessToken).subscribe(res => {
          console.log(res)
          this.authenticationService.user.next(res);
          this.routerLink.navigate(['mes-arbres'])
        });
      } else {
        this.invalidId = true;
      }
    }, error => {
      this.error = true;
    });
  }

  onLogout(): void {
    this.authenticationService.logout();
  }
}
