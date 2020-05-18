import { Component, OnInit } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  invalidId = false;

  mail = '';
  password = '';
  name = '';
  lastName = '';

  error = false;
  success = false;


  constructor(private authenticationService: AuthenticationService,
              private router: Router,
  ) {
  }

  ngOnInit(): void {
    // Does nothing
  }

  onRegister() {

    let form = {
      mail: this.mail,
      password: this.password,
      name: this.name,
      lastName: this.lastName,
    }

    this.authenticationService.register(form).subscribe((res: any) => {

      if (res?.accessToken) {
        this.router.navigate(['auth/login']);
      } else {
      }
    }, error1 => {
      this.error = true;
    });
  }
}
