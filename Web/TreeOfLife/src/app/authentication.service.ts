import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private static readonly dbUrl = 'http://localhost:8888/';
  private member : BehaviorSubject<any> = new BehaviorSubject<any>(undefined);
  
  constructor(private http : HttpClient) { }

  checkExists(mail, password) : Observable<any> {
    return this.http.get(AuthenticationService.dbUrl + 'members/' + mail + '/' + password);
  }

  getMember() : Observable<any> {
    return this.member;
  }

  logIn(member) {
    this.member.next(member);
  }

  logOut(){
    this.member.next(undefined);
  }
}
