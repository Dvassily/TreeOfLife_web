import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web';

  user: BehaviorSubject<any>;

  constructor(private authenticationService: AuthenticationService) {
    this.user = this.authenticationService.user;
  }
}
