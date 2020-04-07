import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  invalidId = false;
  mailAddress = '';
  password = '';
  user: BehaviorSubject<any>;

  constructor(private authenticationService: AuthenticationService) {
    this.user = this.authenticationService.user;
  }

  ngOnInit(): void {
    // Does nothing
  }

  onLogin() {

    this.authenticationService.login(this.mailAddress, this.password).subscribe((res: any) => {
      if (Object.keys(res).length > 0) {

        this.authenticationService.getUser(res.accessToken).subscribe(res => {
          this.authenticationService.user.next(res);
          console.log(res)
        });

      } else {
        this.invalidId = true;
      }
    }, error => {
      this.handleError(error);
    });
  }

  onLogout(): void {
    this.authenticationService.logout();
  }

  handleError(error): void {
    if (error.status === 404) {
      this.invalidId = true;
    }
  }


  name(): void {
    return this.user.getValue().name;
  }

  firstname(): void {
    return this.user.getValue().firstname;
  }
}
