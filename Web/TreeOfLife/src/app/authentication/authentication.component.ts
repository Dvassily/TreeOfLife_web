import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  invalidId : boolean = false;
  mailAddress : string = "";
  password : string = "";
  member : Observable<any>;
  
  constructor(private authenticationService : AuthenticationService) {
    this.member = this.authenticationService.getMember();
  }

  ngOnInit(): void {
    // Does nothing
  }

  onSubmit(){
    var self = this;
    
    this.authenticationService.checkExists(this.mailAddress, this.password).subscribe(member => {
      if (Object.keys(member).length > 0) {
	this.authenticationService.logIn(member);
      } else {
	this.invalidId = true;
      }
    }, error => {
      self.handleError(error);
    });
  }

  handleError(error): void {
    if (error.status === 404) {
	this.invalidId = true;
    }
  }

  logOut() : void {
    this.authenticationService.logOut();
  }

  name(): void {
    return this.member.value.name;
  }

  firstname() : void {
    return this.member.value.firstname;
  }
}
